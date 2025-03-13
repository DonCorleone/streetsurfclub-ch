import {FooterComponent} from '../common/footer/footer.component';
import {NavbarComponent} from '../common/navbar/navbar.component';
import {DatePipe, NgIf, NgOptimizedImage} from '@angular/common';
import {SafeHtmlPipe} from '../pipes/safe-html-pipe';
import {BloggerService} from '../services/blogger.service';
import {map, take} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContentService} from "../services/content.service";
import {ParseHtmlPipe} from "../pipes/parse-html-pipe";


@Component({
    selector: 'app-blog-details-page',
    templateUrl: './blog-details-page.component.html',
    imports: [NavbarComponent, FooterComponent, NgIf, SafeHtmlPipe, ParseHtmlPipe, NgOptimizedImage, DatePipe]
})
export class BlogDetailsPageComponent implements OnInit {

  content = '';
  headerImg: string | null = null;
  title = '';
  date: Date | string = '';
  amountReplies = '0';
  type: 'post' | 'page' | null = null;
  constructor(private bloggerService: BloggerService, private activatedRoute: ActivatedRoute, private contentService: ContentService) {
  }

  ngOnInit(): void {
    const typeParam = this.activatedRoute.snapshot.paramMap.get('type');
    if (typeParam === 'post' || typeParam === 'page') {
      this.type = typeParam;
    } else {
      this.type = null;
    }

    if (!this.type) {
      return;
    }

    const siteId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!siteId) {
      return;
    }

    (this.type === 'post'
      ? this.bloggerService.getPost(siteId)
      : this.bloggerService.getPage(siteId))
      .pipe(
        take(1),
        map((page) => {
          if (page) {
            const parsedContent = this.contentService.parseContent(page);
            this.title = parsedContent?.title ?? '';
            this.content = parsedContent?.content ?? '';
            this.headerImg = !parsedContent?.headerImg ? null : `${parsedContent.headerImg}`;
            this.date = parsedContent?.date ?? '';
            this.amountReplies = parsedContent?.amountReplies ?? '0';
          }
        })
      )
      .subscribe();
  }
}
