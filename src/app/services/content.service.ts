import { Injectable } from '@angular/core';
import { Page } from '../models/pages';
import { IContent } from '../models/IContent';
import { Post } from '../models/posts';
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root',
})
export class ContentService {

  constructor(private sanitizer: DomSanitizer) {

  }
  parseContent(page: Page): IContent | null {
    if (!page) {
      return null;
    }

    let parsedContent: IContent = {
      author: '',
      date: new Date(),
      id: '',
      title: '',
      content: '',
      lead: '',
      headerImg: '',
      amountReplies: '0',
    };

    if (page.kind === 'blogger#post') {
      const images = (page as Post).images;

      if ( images && images.length > 0){
        parsedContent.headerImg = this.getSafeUrl(images[0].url);
      }

      parsedContent.amountReplies = (page as Post).replies?.totalItems;
    }
    if (page.content) {
      let decodedContent = decodeURIComponent(
        page.content.replace(/\\u/g, '%')
      );
      let regexImage =
        /(<div>\s*<div style="text-align: center;?"?>\s*<a href="[^"]*">\s*<img[^>]*><\/a>\s*<\/div>\s*<br \/><b><br \/><\/b>\s*<\/div>)/;
      let match = decodedContent.match(regexImage);

      if (!match) {
        regexImage = /<img[^>]*>/; // Regular expression to match the first <img> tag
        match = decodedContent.match(regexImage);
      }

      if (match) {
        let indexOfMatch = match.index;
        let imgBlock = match[0];
        if (
          imgBlock &&
          parsedContent.headerImg === null &&
          indexOfMatch !== undefined &&
          indexOfMatch < 10
        ) {
          let srcRegex = /<img[^>]+src="([^">]+)"/;
          let srcMatch = imgBlock.match(srcRegex);
          if (srcMatch) {
            parsedContent.headerImg = this.getSafeUrl(srcMatch[1]);
          }
        }
      }

      // Replace the found image block in the content with an empty string, if headerimage is set and match is found
      if (parsedContent.headerImg && match) {
        decodedContent = decodedContent.replace(match[0], '');
      }

      let regexTwoImages = /<a[^>]*>(<img[^>]*>)<\/a>/gm;
      let matchTwoImages = decodedContent.match(regexTwoImages);
      let replacement = ``;
      let firstImage = '';
      if (matchTwoImages && matchTwoImages.length > 1) {
        replacement += `<div class="grid grid-cols-1 md:grid-cols-2 self-center gap-[25px] my-[20px] md:my-[25px] xl:my-[35px]">`;

        // pair of images found
        for (let i = 0; i < matchTwoImages.length; i++) {
          let imgBlock = matchTwoImages[i];
          if (firstImage === '') {
            firstImage = imgBlock;
          }
          let srcRegex = /<img[^>]+src="([^">]+)"/;
          let srcMatch = imgBlock.match(srcRegex);
          replacement += `
          <div class="text-center">
            <img [src]="${
              srcMatch ? srcMatch[0] : ''
            }" class="rounded-t-[20px] rounded-bl-[20px] rounded-br-[20px] md:rounded-br-[70px] lg:rounded-br-[90px]" alt="blog-details-image"/>
          </div>`;

          if (imgBlock !== firstImage) {
            decodedContent = decodedContent.replace(imgBlock, '');
          }
        }
        replacement += `
        </div>`;
      }

      // Insert "https://streetsurfclub.netlify.app/.netlify/images?url=" in all src attributes of images before "https://blogger.googleusercontent.com/img/"
      // and following attributes: "width="1280" height="768" priority and a class-attribute class="h-192 object-cover rounded-[15px]" after the src attribute and change the attribute to ngSrc
      let regexImgSrc = /<img[^>]+src="([^">]+)"\s*\/?>/g;
      let matchImgSrc = decodedContent.match(regexImgSrc);
      if (matchImgSrc) {
        for (let i = 0; i < matchImgSrc.length; i++) {
          let imgBlock = matchImgSrc[i];
          let srcRegex = /<img[^>]+src="([^">]+)"/;
          let srcMatch = imgBlock.match(srcRegex);
          if (srcMatch) {
            let src = srcMatch[1];
            if (src.includes('https://blogger.googleusercontent.com/img/')) {
              let replacement = `<img ngSrc="https://streetsurfclub.netlify.app/.netlify/images?url=${src}&fit=cover&w=1280&h=768&position=center" width="1280" height="768" priority class="h-192 object-cover rounded-[15px]" alt="blog-details-image"/>`;
              decodedContent = decodedContent.replace(imgBlock, replacement);
            }
          }
        }
      }

      decodedContent = decodedContent.replace(firstImage, replacement);
      parsedContent.content = decodedContent;
    }

    const leadRegex = /lead=\"(.*?)\"/;
    const matchLead = page.title.match(leadRegex);

    if (matchLead) {
      parsedContent.lead = matchLead[1];
    }

    parsedContent.title = page.title;
    parsedContent.id = page.id;
    parsedContent.date = new Date(page.published);
    parsedContent.author = page.author?.displayName;
    return parsedContent;
  }
  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
