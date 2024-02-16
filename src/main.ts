import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { AppRoutingModule } from './app/app-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, CarouselModule, AppRoutingModule, NgxScrollTopModule),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
