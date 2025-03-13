import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {BloggerService} from "../../services/blogger.service";
import {concatMap, EMPTY, from, map, Observable, of, switchMap, toArray} from "rxjs";
import {ContentService} from "../../services/content.service";
import {IContent} from "../../models/IContent";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {ParseHtmlPipe} from "../../pipes/parse-html-pipe";

@Component({
    selector: 'app-ancal-blog',
    templateUrl: './ancal-blog.component.html',
    imports: [RouterLink, AsyncPipe, NgIf, NgForOf, DatePipe, ParseHtmlPipe]
})
export class AncalBlogComponent {

  content$: Observable<IContent[] | null>;
  blog$ = this.bloggerService.blog$;

  constructor(private bloggerService: BloggerService, private contentService: ContentService) {

    this.content$ = this.bloggerService.getPosts(-1).pipe(
      switchMap(posts => {
        return from(posts).pipe(
          concatMap(post => {
            const content = this.contentService.parseContent(post);
            return content !== null ? of(content) : EMPTY;
          }),
          toArray(),
          map(contents => contents.length > 0 ? contents : null)
        );
      })
    );
  }
}
