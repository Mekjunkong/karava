import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // First, handle Supabase session refresh
  const supabaseResponse = await updateSession(request);

  // Then handle i18n routing
  const intlResponse = intlMiddleware(request);

  // Merge Supabase cookies into the intl response
  if (supabaseResponse && intlResponse) {
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      intlResponse.cookies.set(cookie.name, cookie.value);
    });
  }

  return intlResponse;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api routes
    // - _next (Next.js internals)
    // - static files
    "/((?!api|_next|.*\\..*).*)",
  ],
};
