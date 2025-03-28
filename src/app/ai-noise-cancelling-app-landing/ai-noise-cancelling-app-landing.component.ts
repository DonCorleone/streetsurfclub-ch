import { Component, ErrorHandler, inject } from '@angular/core';
import { AncalFooterComponent } from './ancal-footer/ancal-footer.component';
import { AncalBlogComponent } from './ancal-blog/ancal-blog.component';
import { AncalBannerComponent } from './ancal-banner/ancal-banner.component';
import { AncalNavbarComponent } from './ancal-navbar/ancal-navbar.component';
import { BloggerService } from "../services/blogger.service";
import { MetaService } from '../services/meta.service';
import { Blog, mapBlogResponseToBlog } from '../interfaces/blog.interface';
import { BlogResponse } from '../models/blog';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
    selector: 'app-ai-noise-cancelling-app-landing',
    templateUrl: './ai-noise-cancelling-app-landing.component.html',
    imports: [
        AncalNavbarComponent,
        AncalBannerComponent,
        AncalBlogComponent,
        AncalFooterComponent
    ]
})
export class AiNoiseCancellingAppLandingComponent {
  private readonly bloggerService = inject(BloggerService);
  private readonly metaService = inject(MetaService);
  private readonly errorHandler = inject(ErrorHandler);

  constructor() {
    this.bloggerService.blog$
      .pipe(
        takeUntilDestroyed(),
        map((response: BlogResponse) => mapBlogResponseToBlog(response)),
        catchError(error => {
          this.errorHandler.handleError(error);
          return EMPTY;
        })
      )
      .subscribe((blog: Blog) => {
        try {
          this.metaService.updateMetaForBlog(blog);
        } catch (error) {
          this.errorHandler.handleError(error);
        }
      });
  }
}
