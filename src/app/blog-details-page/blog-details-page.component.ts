import { FooterComponent } from '../common/footer/footer.component';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { SafeHtmlPipe } from '../pipes/safe-html-pipe';
import { BloggerService } from '../services/blogger.service';
import { map, take } from 'rxjs';
import { Component, Input, OnInit, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../models/pages';


@Component({
  selector: 'app-blog-details-page',
  templateUrl: './blog-details-page.component.html',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, NgIf, AsyncPipe, SafeHtmlPipe],
})
export class BlogDetailsPageComponent implements OnInit {

  content = '';
  headerImg: string | null = null;
  title = '';
  
  constructor(private bloggerService: BloggerService, private activatedRoute: ActivatedRoute) {}
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
          this.parseContent(page);
        }
      })
    )
    .subscribe();
  }

  parseContent(page: Page): void {
    if (page) {
      // Do something with the blog details
      let decodedContent = decodeURIComponent(page.content.replace(/\\u/g, '%'));
      console.log(decodedContent);
      let regexImage = /(<div>\s*<div style="text-align: center;?"?>\s*<a href="[^"]*">\s*<img[^>]*><\/a>\s*<\/div>\s*<br \/><b><br \/><\/b>\s*<\/div>)/;
      let match = decodedContent.match(regexImage);
      let imgBlock = match ? match[1] : null;

      decodedContent = decodedContent.replace(regexImage, '');

      if (imgBlock) {
        let srcRegex = /<img[^>]+src="([^">]+)"/;
        let srcMatch = imgBlock.match(srcRegex);
        this.headerImg = srcMatch ? srcMatch[1] : null;
      }

      console.log(decodedContent);
      let regexTwoImages = /(<div class="separator"[^>]*><a href="([^"]*)"[^>]*><img[^>]*><\/a><\/div>\s*<br \/>\s*<div class="separator"[^>]*><a href="([^"]*)"[^>]*><img[^>]*><\/a><\/div>)/;
      let matchTwoImages = decodedContent.match(regexTwoImages);
      let imgBlockTwoImages = matchTwoImages ? matchTwoImages[1] : null;

      if (imgBlockTwoImages) {
        let replacement = `
        <div class="grid grid-cols-1 md:grid-cols-2 self-center gap-[25px] my-[20px] md:my-[25px] xl:my-[35px]">
          <div class="text-center">
            <img src="${matchTwoImages ? matchTwoImages[2]: ''}" class="rounded-t-[20px] rounded-bl-[20px] rounded-br-[20px] md:rounded-br-[70px] lg:rounded-br-[90px]" alt="blog-details-image">
          </div>
          <div class="text-center">
            <img src="${matchTwoImages ? matchTwoImages[3] : ''}" class="rounded-b-[20px] rounded-tr-[20px] rounded-tl-[20px] md:rounded-tl-[90px] lg:rounded-tl-[70px]" alt="blog-details-image">
          </div>
        </div>
        `;

        decodedContent = decodedContent.replace(regexTwoImages, replacement);
      }

      this.content = decodedContent;
      this.title = page.title;
    }
  }
}
