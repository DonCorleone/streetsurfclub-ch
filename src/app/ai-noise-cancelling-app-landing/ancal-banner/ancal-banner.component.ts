import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {BloggerService} from "../../services/blogger.service";
import {map, Observable} from "rxjs";
import {Post} from "../../models/posts";

@Component({
  selector: 'app-ancal-banner',
  templateUrl: './ancal-banner.component.html',
  styleUrls: ['./ancal-banner.component.scss'],
  standalone: true,
  imports: [NgIf, AsyncPipe]
})
export class AncalBannerComponent implements OnInit {
  blog$: Observable<Post | null> = new Observable<Post | null>();

  constructor(private bloggerService: BloggerService) {
  }

  ngOnInit(): void {
    this.blog$ = this.bloggerService.findPost('**Main**').pipe(
      map(posts => {
        if (posts && posts.length > 0) {
          return posts[0];
        } else {
          return null;
        }
      }
      ));
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
