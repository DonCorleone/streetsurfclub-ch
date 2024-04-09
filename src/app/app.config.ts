import {ApplicationConfig, LOCALE_ID, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {CarouselModule} from "ngx-owl-carousel-o";
import {NgxScrollTopModule} from "ngx-scrolltop";
import {provideAnimations} from "@angular/platform-browser/animations";
import { DatePipe, registerLocaleData } from '@angular/common';

import localeDE from '@angular/common/locales/de';
registerLocaleData(localeDE);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    DatePipe, {
      provide: LOCALE_ID,
      useValue: 'de-CH'
    },
    importProvidersFrom(HttpClientModule, BrowserModule, CarouselModule, NgxScrollTopModule),

    provideAnimations()
  ]
};
