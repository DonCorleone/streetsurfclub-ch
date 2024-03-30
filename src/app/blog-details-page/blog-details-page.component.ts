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
            let regexTwoImages = /(<div class="separator" style="clear: both;">\s*<a href="([^"]*)"[^>]*>[\s\S]*?<\/div>\s*<div class="separator" style="clear: both;">\s*<a href="([^"]*)"[^>]*>[\s\S]*?<\/div>)/;
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
          }
        })
      )
      .subscribe();
  }
}
