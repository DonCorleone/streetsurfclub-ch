import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {BloggerService} from "../../services/blogger.service";
import {map, take} from "rxjs";
import {SafeHtmlPipe} from "../../pipes/safe-html-pipe";
import {ContentService} from "../../services/content.service";
import {IContent} from "../../models/IContent";

@Component({
  selector: 'app-ancal-banner',
  templateUrl: './ancal-banner.component.html',
  styleUrls: ['./ancal-banner.component.scss'],
  standalone: true,
  imports: [NgIf, AsyncPipe, SafeHtmlPipe, NgOptimizedImage]
})
export class AncalBannerComponent implements OnInit {
  parsedContent: IContent | null | undefined;

  constructor(private bloggerService: BloggerService, private contentService: ContentService) {
  }

  ngOnInit(): void {
    this.bloggerService.findPost('**Main**').pipe(
      take(1),
      map(posts => {
          if (posts && posts.length > 0) {
            this.parsedContent = this.contentService.parseContent(posts[0]);
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
