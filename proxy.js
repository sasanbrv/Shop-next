import { NextResponse } from "next/server";

export function proxy(request) {
  const sessionId = request.cookies.get("sessionId")?.value;

  console.log("PROXY RUNNING");
  console.log("SESSION:", sessionId);

  if (sessionId) {
      return NextResponse.next();
    }
    const url = new URL(request.url)
    url.pathname = "/login"
    return NextResponse.redirect(url.toString());
}

export const config = {
  matcher: ["/dashboard/:path*"],
};