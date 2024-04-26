import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';
import { authInterceptor } from './auth/interceptor/auth.interceptor';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideGoogleId } from './google-login/google-login.config';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules), withViewTransitions()),
    provideHttpClient(withFetch(), withInterceptors([baseUrlInterceptor, authInterceptor])), provideClientHydration(), provideAnimationsAsync(),
    provideGoogleId('918915279081-4vdi1aklj6567m4qjt1is4c6opfjchm3.apps.googleusercontent.com')

  ]
};
