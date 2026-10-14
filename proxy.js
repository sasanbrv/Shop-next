
import { NextResponse } from "next/server";

export function proxy(request) {
  const session = request.cookies.get("shop-session")?.value;

  if (session) {
    return NextResponse.next();
  }

  const url = new URL("/login", request.url);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
