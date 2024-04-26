import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    const serverUrl = 'http://localhost:8080'

    const clonedReq = req.clone({
        url: `${serverUrl}/${req.url}`,
    });
    return next(clonedReq);
};
