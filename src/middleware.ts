import {
  appendVaryAccept,
  getNotAcceptableBody,
  isRscRequest,
  markdownApiPath,
  negotiateRequest,
} from "@/lib/accept";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const decision = negotiateRequest({
    pathname: req.nextUrl.pathname,
    accept: req.headers.get("accept"),
    rsc: isRscRequest(req.headers),
    method: req.method,
  });

  if (decision.action === "markdown") {
    const url = req.nextUrl.clone();
    url.pathname = markdownApiPath(decision.pathname);
    const rewritten = NextResponse.rewrite(url);
    appendVaryAccept(rewritten.headers);
    rewritten.headers.set("Vary", "Accept, Accept-Encoding");
    return rewritten;
  }

  if (decision.action === "406") {
    return new NextResponse(getNotAcceptableBody(), {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept, Accept-Encoding",
      },
    });
  }

  const res = NextResponse.next();
  appendVaryAccept(res.headers);
  return res;
}

export const config = {
  matcher: ["/((?!api/|_next/|_vercel/).*)"],
};
