import { Component, OnInit, inject } from '@angular/core';

import {BloggerService} from "../../services/blogger.service";
import {map, take} from "rxjs";
import {SafeHtmlPipe} from "../../pipes/safe-html-pipe";
import {ContentService} from "../../services/content.service";
import {IContent} from "../../models/IContent";
import {ParseHtmlPipe} from "../../pipes/parse-html-pipe";

@Component({
    selector: 'app-ancal-banner',
    templateUrl: './ancal-banner.component.html',
    styleUrls: ['./ancal-banner.component.css'],
    imports: [SafeHtmlPipe, ParseHtmlPipe]
})
export class AncalBannerComponent implements OnInit {
  private bloggerService = inject(BloggerService);
  private contentService = inject(ContentService);

  parsedContent: IContent | null | undefined;

  ngOnInit(): void {
    this.bloggerService.findPost('**Main**').pipe(
      take(1),
      map(post => {
          if (post) {
            this.parsedContent = this.contentService.parseContent(post);
          }
        }
      )).subscribe();
  }

  // Video Popup
  isOpen = false;

  openPopup(): void {
    this.isOpen = true;
  }

  closePopup(): void {
    this.isOpen = false;
  }
}
