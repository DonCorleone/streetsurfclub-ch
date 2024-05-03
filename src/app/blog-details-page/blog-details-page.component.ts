import {FooterComponent} from '../common/footer/footer.component';
import {NavbarComponent} from '../common/navbar/navbar.component';
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {SafeHtmlPipe} from '../pipes/safe-html-pipe';
import {BloggerService} from '../services/blogger.service';
import {map, take} from 'rxjs';
import {Component, Input, OnInit, input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContentService} from "../services/content.service";
import {ParseHtmlPipe} from "../pipes/parse-html-pipe";


@Component({
  selector: 'app-blog-details-page',
  templateUrl: './blog-details-page.component.html',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, NgIf, AsyncPipe, SafeHtmlPipe, ParseHtmlPipe, NgOptimizedImage],
})
export class BlogDetailsPageComponent implements OnInit {

  content = '';
  headerImg: string | null = null;
  title = '';

  constructor(private bloggerService: BloggerService, private activatedRoute: ActivatedRoute, private contentService: ContentService) {
  }

  ngOnInit(): void {

    const type = this.activatedRoute.snapshot.paramMap.get('type');
    if (!type) {
      return;
    }
    const siteId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!siteId) {
      return;
    }

    (type === 'post'
      ? this.bloggerService.getPost(siteId)
      : this.bloggerService.getPage(siteId))
      .pipe(
        take(1),
        map((page) => {
          if (page) {
            const parsedContent = this.contentService.parseContent(page);
            this.title = parsedContent?.title ?? '';
            this.content = parsedContent?.content ?? '';
            this.headerImg = parsedContent?.headerImg ?? null;
          }
        })
      )
      .subscribe();
  }
}
