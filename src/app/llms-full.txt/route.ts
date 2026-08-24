import { getLlmsFullTxt } from "@/lib/llms";

export const dynamic = "force-static";

export async function GET() {
  const body = await getLlmsFullTxt();
  return new Response(body.endsWith("\n") ? body : `${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
