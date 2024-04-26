import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const cookieService = inject(SsrCookieService);
  const platformId = inject(PLATFORM_ID);
  const token = isPlatformBrowser(platformId) ? cookieService.get('token') : null;

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
    return next(authReq);
  }
  return next(req);
}
