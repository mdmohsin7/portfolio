export const PRODUCES = ["text/html", "text/markdown"] as const;

export type ProducedType = (typeof PRODUCES)[number];

type AcceptEntry = { type: string; q: number; specificity: number };

export function parseAccept(header: string): AcceptEntry[] {
  return header.split(",").map((raw) => {
    const parts = raw
      .trim()
      .split(";")
      .map((s) => s.trim());
    const type = (parts[0] ?? "").toLowerCase();
    let q = 1;
    for (const param of parts.slice(1)) {
      const [name, value] = param.split("=").map((s) => s.trim());
      if (name === "q") {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
      }
    }
    const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
    return { type, q, specificity };
  });
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) {
    return candidate.startsWith(entry.type.slice(0, -1));
  }
  return entry.type === candidate;
}

/**
 * acceptmarkdown.com Accept ranking: highest q, then most specific range,
 * then client order. Missing Accept and empty lists default to text/html.
 * Returns null when every produced type is rejected (caller should 406).
 */
export function preferredType(header: string | null): ProducedType | null {
  if (!header) return PRODUCES[0];
  const entries = parseAccept(header);
  if (entries.length === 0) return PRODUCES[0];

  let bestType: ProducedType | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of PRODUCES) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;
    for (let idx = 0; idx < entries.length; idx++) {
      const e = entries[idx];
      if (!matches(e, candidate)) continue;
      if (
        matched === null ||
        e.specificity > matched.specificity ||
        (e.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = e;
        matchedPosition = idx;
      }
    }
    if (matched === null) continue;
    if (matched.q <= 0) continue;

    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
}

const STATIC_EXT =
  /\.(xml|txt|ico|png|jpe?g|gif|webp|avif|svg|woff2?|ttf|otf|json|map|css|js|webmanifest)$/i;

export function shouldNegotiatePath(pathname: string): boolean {
  if (pathname.endsWith(".md")) return true;
  const last = pathname.split("/").filter(Boolean).pop() ?? "";
  if (last.includes(".")) return false;
  if (STATIC_EXT.test(pathname)) return false;
  return true;
}

export function isRscRequest(headers: Headers): boolean {
  return (
    headers.has("rsc") ||
    headers.has("next-router-state-tree") ||
    headers.has("next-router-prefetch") ||
    headers.has("next-action")
  );
}

export type NegotiateAction =
  | { action: "markdown"; pathname: string }
  | { action: "html" }
  | { action: "406" }
  | { action: "skip" };

export function negotiateRequest(input: {
  pathname: string;
  accept: string | null;
  rsc: boolean;
  method?: string;
}): NegotiateAction {
  const method = input.method ?? "GET";
  if (method !== "GET" && method !== "HEAD") return { action: "skip" };
  if (input.rsc) return { action: "skip" };
  if (!shouldNegotiatePath(input.pathname)) return { action: "skip" };

  if (input.pathname.endsWith(".md")) {
    return { action: "markdown", pathname: stripMdExtension(input.pathname) };
  }

  const chosen = preferredType(input.accept);
  if (chosen === "text/markdown") {
    return { action: "markdown", pathname: input.pathname };
  }
  if (chosen === null && input.accept) {
    return { action: "406" };
  }
  return { action: "html" };
}

export function stripMdExtension(pathname: string): string {
  return pathname.endsWith(".md") ? pathname.slice(0, -3) || "/" : pathname;
}

export function markdownApiPath(pathname: string): string {
  const cleaned = pathname === "/" ? "" : pathname;
  return `/api/markdown${cleaned}`;
}

export function getNotAcceptableBody(): string {
  return "Not Acceptable\n\nAvailable: text/html, text/markdown\n";
}

export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", "Accept");
    return;
  }
  const tokens = existing.split(",").map((s) => s.trim().toLowerCase());
  if (!tokens.includes("accept")) {
    headers.set("Vary", `${existing}, Accept`);
  }
}
