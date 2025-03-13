import {Component} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {AncalFooterComponent} from './ancal-footer/ancal-footer.component';
import {AncalBlogComponent} from './ancal-blog/ancal-blog.component';
import {AncalBannerComponent} from './ancal-banner/ancal-banner.component';
import {AncalNavbarComponent} from './ancal-navbar/ancal-navbar.component';
import {BloggerService} from "../services/blogger.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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
  constructor(private titleService: Title, private bloggerService: BloggerService, private meta: Meta  ) {
    this.bloggerService.blog$
      .pipe(takeUntilDestroyed()).subscribe(blog => {
        this.titleService.setTitle(blog.name);
        this.meta.updateTag(
          { name: 'description', content: `${blog.name} - ${blog.description}` },
          'name=description');
      }
    );
  }
}
