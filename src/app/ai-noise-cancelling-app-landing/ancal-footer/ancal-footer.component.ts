import { Component, inject } from '@angular/core';
import { Page } from "../../models/pages";
import { SafeHtmlPipe } from "../../pipes/safe-html-pipe";

import { RouterLink, ActivatedRoute } from "@angular/router";
import { BloggerService } from "../../services/blogger.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-ancal-footer',
  templateUrl: './ancal-footer.component.html',
  imports: [
    SafeHtmlPipe,
    RouterLink
  ]
})
export class AncalFooterComponent {
  private bloggerService = inject(BloggerService);
  private route = inject(ActivatedRoute);
  
  showAdditionalResources = false;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.showAdditionalResources = params['res'] !== undefined;
    });
  }

  navigationLinks = [
    { path: 'ancalblog', title: 'Blog' },
    { path: 'banner', title: 'Banner' },
    { path: 'brands', title: 'Brands' },
    { path: 'cta', title: 'CTA' },
    { path: 'download', title: 'Download' },
    { path: 'faq', title: 'FAQ' },
    { path: 'features', title: 'Features' },
    { path: 'pricing', title: 'Pricing' },
    { path: 'supported', title: 'Supported' },
    { path: 'test', title: 'Test Canora' },
    { path: 'testimonials', title: 'Testimonials' },
    { path: 'whatwedo', title: 'What We Do' }
  ];

  supports: Page[] = [];
  terms: Page[] = [];
  resources: Page[] = [];
  quickLinks: Page[] = [];

  constructor() {
    this.bloggerService.pages$.pipe(
      takeUntilDestroyed()
    ).subscribe(pages => {
      if (pages.length > 0) {
        this.quickLinks = this.bloggerService.quickLinks;
        this.resources = this.bloggerService.resources;
        this.terms = this.bloggerService.terms;
        this.supports = this.bloggerService.supports;
      }
    });
  }
}
