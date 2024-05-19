import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as AOS from 'aos';
import {AncalFooterComponent} from './ancal-footer/ancal-footer.component';
import {AncalBlogComponent} from './ancal-blog/ancal-blog.component';
import {AncalFaqComponent} from './ancal-faq/ancal-faq.component';
import {AncalPricingComponent} from './ancal-pricing/ancal-pricing.component';
import {AncalCtaComponent} from './ancal-cta/ancal-cta.component';
import {AncalTestimonialsComponent} from './ancal-testimonials/ancal-testimonials.component';
import {AncalTestCanoraComponent} from './ancal-test-canora/ancal-test-canora.component';
import {AncalSupportedComponent} from './ancal-supported/ancal-supported.component';
import {AncalWhatWeDoComponent} from './ancal-what-we-do/ancal-what-we-do.component';
import {AncalDownloadComponent} from './ancal-download/ancal-download.component';
import {AncalBrandsComponent} from './ancal-brands/ancal-brands.component';
import {AncalFeaturesComponent} from './ancal-features/ancal-features.component';
import {AncalBannerComponent} from './ancal-banner/ancal-banner.component';
import {AncalNavbarComponent} from './ancal-navbar/ancal-navbar.component';
import {BehaviorSubject, map, Observable, ObservableInput, Subject, take, takeUntil, tap} from "rxjs";
import {Page} from "../models/pages";
import {BloggerService} from "../services/blogger.service";
import {AsyncPipe} from "@angular/common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-ai-noise-cancelling-app-landing',
  templateUrl: './ai-noise-cancelling-app-landing.component.html',
  standalone: true,
  imports: [
    AncalNavbarComponent,
    AncalBannerComponent,
    AncalFeaturesComponent,
    AncalBrandsComponent,
    AncalDownloadComponent,
    AncalWhatWeDoComponent,
    AncalSupportedComponent,
    AncalTestCanoraComponent,
    AncalTestimonialsComponent,
    AncalCtaComponent,
    AncalPricingComponent,
    AncalFaqComponent,
    AncalBlogComponent,
    AncalFooterComponent,
    AsyncPipe,
  ],
})
export class AiNoiseCancellingAppLandingComponent {
  pages$: Observable<Page[]> = this.bloggerService.pages$.pipe(
    tap(pages => {
        if (pages.length > 0) {
          this.quickLinks = this.bloggerService.quickLinks;
          this.resources = this.bloggerService.resources;
          this.terms = this.bloggerService.terms;
          this.supports = this.bloggerService.supports;
        }
      }
    ));
  supports: Page[] = [];
  terms: Page[] = [];
  resources: Page[] = [];
  quickLinks: Page[] = [];

  constructor(private titleService: Title, private bloggerService: BloggerService) {
    this.bloggerService.blog$
      .pipe(takeUntilDestroyed()).subscribe(blog => {
        this.titleService.setTitle(blog.name);
      }
    );
  }
}
