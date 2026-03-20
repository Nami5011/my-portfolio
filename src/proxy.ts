import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, userAgent } from 'next/server';

// export function proxy(request: NextRequest) {
//   const { device } = userAgent(request)
//   console.log(device);
//   const handleI18nRouting = createMiddleware(routing);
//   const response = handleI18nRouting(request);
//   return response;
// }

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
