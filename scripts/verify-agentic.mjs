#!/usr/bin/env node
/**
 * Probe public agent-facing endpoints on a running server.
 * Usage: node scripts/verify-agentic.mjs [baseUrl]
 */
const base = process.argv[2] || "http://127.0.0.1:3000";

function fail(message) {
  console.error(`FAIL  ${message}`);
  process.exitCode = 1;
}

function pass(message) {
  console.log(`PASS  ${message}`);
}

async function request(path, headers = {}) {
  const res = await fetch(`${base}${path}`, { headers, redirect: "manual" });
  const body = await res.text();
  return { res, body };
}

function header(res, name) {
  return res.headers.get(name) || "";
}

async function main() {
  const home = await request("/");
  if (home.res.status !== 200) fail(`GET / status ${home.res.status}`);
  else pass("GET / 200");
  if (!/<h1[\s>]/i.test(home.body)) fail("homepage missing <h1>");
  else pass("homepage has <h1>");
  const text = home.body.replace(/<script[\s\S]*?<\/script>/gi, " ");
  const chars = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
  if (chars < 500) fail(`homepage text ${chars} chars`);
  else pass(`homepage text ${chars} chars`);
  if (!home.body.includes("application/ld+json")) fail("homepage missing JSON-LD");
  else pass("homepage JSON-LD present");
  if (!home.body.includes("Mohsin Mohammed")) fail("homepage missing brand name");
  else pass("homepage includes Mohsin Mohammed");

  const missing = await request("/some-path-that-does-not-exist");
  if (missing.res.status !== 404) fail(`missing path status ${missing.res.status}`);
  else pass("nonexistent path HTTP 404");
  if (!/llms\.txt|sitemap/i.test(missing.body)) {
    fail("HTML 404 missing recovery links");
  } else pass("HTML 404 has recovery links");

  const md404 = await request("/some-path-that-does-not-exist", {
    Accept: "text/markdown",
  });
  if (md404.res.status !== 404) fail(`markdown 404 status ${md404.res.status}`);
  else pass("markdown 404 status 404");
  if (!header(md404.res, "content-type").includes("text/markdown")) {
    fail(`markdown 404 content-type ${header(md404.res, "content-type")}`);
  } else pass("markdown 404 Content-Type text/markdown");
  if (!/accept/i.test(header(md404.res, "vary"))) {
    fail(`markdown 404 Vary ${header(md404.res, "vary")}`);
  } else pass("markdown 404 Vary includes Accept");
  if (!md404.body.includes("llms.txt")) fail("markdown 404 missing llms.txt");
  else pass("markdown 404 body points at llms.txt");

  const mdHome = await request("/", { Accept: "text/markdown" });
  if (mdHome.res.status !== 200) fail(`Accept markdown / status ${mdHome.res.status}`);
  else pass("Accept: text/markdown / 200");
  if (!header(mdHome.res, "content-type").includes("text/markdown")) {
    fail(`Accept markdown content-type ${header(mdHome.res, "content-type")}`);
  } else pass("Accept: text/markdown Content-Type");
  if (!/accept/i.test(header(mdHome.res, "vary"))) {
    fail(`Accept markdown Vary ${header(mdHome.res, "vary")}`);
  } else pass("Accept: text/markdown Vary includes Accept");

  const htmlHome = await request("/", { Accept: "text/html" });
  if (!header(htmlHome.res, "content-type").includes("text/html")) {
    fail(`Accept html content-type ${header(htmlHome.res, "content-type")}`);
  } else pass("Accept: text/html still serves HTML");

  const indexMd = await request("/index.md");
  if (indexMd.res.status !== 200 || !indexMd.body.startsWith("# Mohsin Mohammed")) {
    fail("/index.md did not serve homepage markdown");
  } else pass("/index.md homepage markdown");

  const files = [
    ["/llms.txt", "text/plain", "Mohsin Mohammed developer resources"],
    ["/llms-full.txt", "text/plain", "# Mohsin Mohammed"],
    ["/sitemap.xml", "xml", "<urlset"],
    ["/sitemap.md", "markdown", "# Sitemap"],
    ["/robots.txt", "text/plain", "Allow:"],
    ["/developers", "text/html", "Mohsin Mohammed developer resources"],
    ["/developers.md", "markdown", "Mohsin Mohammed developer resources"],
  ];

  for (const [path, kind, needle] of files) {
    const { res, body } = await request(path);
    if (res.status !== 200) fail(`${path} status ${res.status}`);
    else pass(`${path} 200`);
    const ct = header(res, "content-type");
    if (kind === "xml" && !ct.includes("xml")) fail(`${path} content-type ${ct}`);
    if (kind === "markdown" && !ct.includes("markdown")) fail(`${path} content-type ${ct}`);
    if (kind === "text/plain" && !ct.includes("text/plain")) fail(`${path} content-type ${ct}`);
    if (kind === "text/html" && !ct.includes("text/html")) fail(`${path} content-type ${ct}`);
    if (!body.includes(needle)) fail(`${path} missing ${needle}`);
  }

  if (process.exitCode) {
    console.error(`\nVerification against ${base} failed.`);
    process.exit(process.exitCode);
  }
  console.log(`\nAll endpoint checks passed against ${base}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
