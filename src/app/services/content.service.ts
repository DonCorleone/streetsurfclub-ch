import {Injectable} from '@angular/core';
import {Page} from "../models/pages";
import {IContent} from "../models/IContent";
import {Post} from "../models/posts";

@Injectable({
  providedIn: 'root'
})
export class ContentService {
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
      headerImg: null
    };

    if (page.kind === 'blogger#post') {
      const images = (page as Post).images;
      parsedContent.headerImg = images && images.length > 0 ? images[0].url : null;
    }
    if (page.content) {

      let decodedContent = decodeURIComponent(page.content.replace(/\\u/g, '%'));
      let regexImage = /(<div>\s*<div style="text-align: center;?"?>\s*<a href="[^"]*">\s*<img[^>]*><\/a>\s*<\/div>\s*<br \/><b><br \/><\/b>\s*<\/div>)/;
      let match = decodedContent.match(regexImage);
      let indexOfMatch: number | undefined = 0;
      if (!match) {
        regexImage = /<img[^>]*>/; // Regular expression to match the first <img> tag
        match = decodedContent.match(regexImage);
      }

      if (match) {
        indexOfMatch = match.index;
        let imgBlock = match[0];
        if (imgBlock && parsedContent.headerImg === null && indexOfMatch !== undefined && indexOfMatch < 10) {
          let srcRegex = /<img[^>]+src="([^">]+)"/;
          let srcMatch = imgBlock.match(srcRegex);
          parsedContent.headerImg = srcMatch ? srcMatch[1] : null;
          decodedContent = decodedContent.replace(regexImage, '');
        }
      }

      let regexTwoImages = /(<div class="separator"[^>]*><a href="([^"]*)"[^>]*><img[^>]*><\/a><\/div>\s*<br \/>\s*<div class="separator"[^>]*><a href="([^"]*)"[^>]*><img[^>]*><\/a><\/div>)/;
      let matchTwoImages = decodedContent.match(regexTwoImages);

      let imgBlockTwoImages = matchTwoImages ? matchTwoImages[1] : null;

      if (imgBlockTwoImages) {
        let replacement = `
        <div class="grid grid-cols-1 md:grid-cols-2 self-center gap-[25px] my-[20px] md:my-[25px] xl:my-[35px]">
          <div class="text-center">
            <img [src]="${matchTwoImages ? matchTwoImages[2] : ''}" class="rounded-t-[20px] rounded-bl-[20px] rounded-br-[20px] md:rounded-br-[70px] lg:rounded-br-[90px]" alt="blog-details-image">
          </div>
          <div class="text-center">
            <img [src]="${matchTwoImages ? matchTwoImages[3] : ''}" class="rounded-b-[20px] rounded-tr-[20px] rounded-tl-[20px] md:rounded-tl-[90px] lg:rounded-tl-[70px]" alt="blog-details-image">
          </div>
        </div>
        `;
        decodedContent = decodedContent.replace(regexTwoImages, replacement);
      }


      parsedContent.content = decodedContent;
    }

    const leadRegex = /lead=\"(.*?)\"/;
    const matchLead = page.title.match(leadRegex);

    if (matchLead) {
      parsedContent.lead = matchLead[1]
    }

    parsedContent.title = page.title;
    parsedContent.id = page.id;
    parsedContent.date = new Date(page.published);
    parsedContent.author = page.author?.displayName;
    return parsedContent;
  }
}
