import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './Core/Interceptors/header.interceptor';
import { errorsInterceptor } from './Core/Interceptors/errors.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './Core/Interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes , withViewTransitions()),
    provideClientHydration() ,
    provideHttpClient(withFetch() , withInterceptors([headerInterceptor , errorsInterceptor , loadingInterceptor])),
    provideAnimations() , provideToastr() , importProvidersFrom(NgxSpinnerModule)],
};
