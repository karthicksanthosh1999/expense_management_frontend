import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Access token from cookie or header
  const accessToken =
    req.cookies.get("refreshToken")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  // ❌ No token → redirect to login
  if (!accessToken) {
    return redirectToLogin(req);
  }

  // ✅ Token exists → allow
  return NextResponse.next();
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
      Protect everything except:
      - api routes
      - static files
      - public assets
    */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
