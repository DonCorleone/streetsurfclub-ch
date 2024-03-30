import { FooterComponent } from '../common/footer/footer.component';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { SafeHtmlPipe } from '../pipes/safe-html-pipe';
import { BloggerPage, BloggerService } from '../services/blogger.service';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { map, of, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-details-page',
  templateUrl: './blog-details-page.component.html',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, NgIf, AsyncPipe, SafeHtmlPipe],
})
export class BlogDetailsPageComponent implements OnInit {
  content: string = '';
  headerImg: string | null = null;

  constructor(private bloggerService: BloggerService) {}
  ngOnInit(): void {
    // Retrieve the blog details from the service
    this.bloggerService
      .getPage()
      .pipe(
        take(1),
        map((page) => {
          if (page) {
            // Do something with the blog details
            let regex =
              /(<div>\s*<div style="text-align: center"?>\s*<a[^>]*>\s*<img[^>]*><\/a>\s*<\/div>\s*<br \/><b><br \/><\/b>\s*<\/div>)/;
            let match = page.content.match(regex);
            let imgBlock = match ? match[1] : null;

            this.content = page.content.replace(regex, '');

            if (imgBlock) {
              let srcRegex = /<img[^>]+src="([^">]+)"/;
              let srcMatch = imgBlock.match(srcRegex);
              this.headerImg = srcMatch ? srcMatch[1] : null;
            }
          }
        })
      )
      .subscribe();
  }
}
