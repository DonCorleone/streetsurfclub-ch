import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {CarouselModule} from "ngx-owl-carousel-o";
import {NgxScrollTopModule} from "ngx-scrolltop";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(HttpClientModule, BrowserModule, CarouselModule, NgxScrollTopModule),

    provideAnimations()
  ]
};
