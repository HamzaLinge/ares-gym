import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isAuthenticated } from "@/lib/auth";
import { routePaths } from "@/utils/route-paths";

export function middleware(request: NextRequest) {
  if (!isAuthenticated(request)) {
    if (!request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL(routePaths.auth.path, request.url));
    }
    console.log("Go to Auth page");
  } else if (
    request.nextUrl.pathname.startsWith("/auth") ||
    request.nextUrl.pathname.length === 1
  ) {
    console.log("Go to Dashboard page");
    return NextResponse.redirect(
      new URL(routePaths.dashboard.path, request.url)
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
