import {Component} from '@angular/core';
import {FooterComponent} from '../common/footer/footer.component';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../common/navbar/navbar.component';
import {BloggerService} from '../services/blogger.service';
import {map, Observable, of, take} from "rxjs";
import {AsyncPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Post} from "../models/posts";
import {SafeHtmlPipe} from "../pipes/safe-html-pipe";
import {ContentService} from "../services/content.service";
import {IContent} from "../models/IContent";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FooterComponent, AsyncPipe, NgForOf, DatePipe, NgIf, SafeHtmlPipe, NgOptimizedImage]
})
export class BlogPageComponent {
  contents$: Observable<(IContent | null)[]>;

  constructor(private bloggerService: BloggerService, contentService: ContentService) {
    // this.pages$ =
    this.contents$ = this.bloggerService.getPosts().pipe(
      take(1),
      map(posts => posts.map(post => {
        return contentService.parseContent(post);
      }))
    )
  }
}
