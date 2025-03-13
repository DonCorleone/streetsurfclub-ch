import {ApplicationConfig, LOCALE_ID, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";
import { DatePipe, provideNetlifyLoader, registerLocaleData } from '@angular/common';

import localeDE from '@angular/common/locales/de';
registerLocaleData(localeDE);

export const appConfig: ApplicationConfig = {
  providers: [
    provideNetlifyLoader('https://main--streetsurfclub.netlify.app'),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    DatePipe, {
      provide: LOCALE_ID,
      useValue: 'de-CH'
    },
    importProvidersFrom(BrowserModule),

    provideAnimations()
  ]
};
