import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as AOS from 'aos';
import { AncalFooterComponent } from './ancal-footer/ancal-footer.component';
import { AncalBlogComponent } from './ancal-blog/ancal-blog.component';
import { AncalFaqComponent } from './ancal-faq/ancal-faq.component';
import { AncalPricingComponent } from './ancal-pricing/ancal-pricing.component';
import { AncalCtaComponent } from './ancal-cta/ancal-cta.component';
import { AncalTestimonialsComponent } from './ancal-testimonials/ancal-testimonials.component';
import { AncalTestCanoraComponent } from './ancal-test-canora/ancal-test-canora.component';
import { AncalSupportedComponent } from './ancal-supported/ancal-supported.component';
import { AncalWhatWeDoComponent } from './ancal-what-we-do/ancal-what-we-do.component';
import { AncalDownloadComponent } from './ancal-download/ancal-download.component';
import { AncalBrandsComponent } from './ancal-brands/ancal-brands.component';
import { AncalFeaturesComponent } from './ancal-features/ancal-features.component';
import { AncalBannerComponent } from './ancal-banner/ancal-banner.component';
import { AncalNavbarComponent } from './ancal-navbar/ancal-navbar.component';
import {take} from "rxjs";
import {Page} from "../models/pages";
import {BloggerService} from "../services/blogger.service";

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
  ],
})
export class AiNoiseCancellingAppLandingComponent implements OnInit{
  title = 'AI Noise Cancelling App Landing - Canora';
  pages: Page[] = [];
  contact: Page | undefined;

  constructor(private titleService: Title, private bloggerService: BloggerService) {}

  ngOnInit() {
    this.bloggerService.getPages().pipe(
      take(1)
    ).subscribe((pages: Page[]) => {
      this.pages = pages;
      this.contact = pages.find(page => page.title.indexOf('contact') > 0);
    }
    );
    this.titleService.setTitle(this.title);
  }
}
