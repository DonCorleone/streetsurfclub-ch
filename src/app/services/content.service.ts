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
      title: '',
      content: '',
      lead: '',
      headerImg: null
    };
    // Do something with the blog details
    let decodedContent = decodeURIComponent(page.content.replace(/\\u/g, '%'));
    console.log(decodedContent);
    let regexImage = /(<div>\s*<div style="text-align: center;?"?>\s*<a href="[^"]*">\s*<img[^>]*><\/a>\s*<\/div>\s*<br \/><b><br \/><\/b>\s*<\/div>)/;
    let match = decodedContent.match(regexImage);
    if (!match) {
      regexImage = /<img[^>]*>/; // Regular expression to match the first <img> tag
      match = decodedContent.match(regexImage);
    }
    let imgBlock = match ? match[0] : null;

    decodedContent = decodedContent.replace(regexImage, '');

    if (page.kind === 'blogger#post') {
      const images = (page as Post).images;
      parsedContent.headerImg = images && images.length > 0 ? images[0].url : null;
    }

    if (imgBlock && parsedContent.headerImg === null) {
      let srcRegex = /<img[^>]+src="([^">]+)"/;
      let srcMatch = imgBlock.match(srcRegex);
      parsedContent.headerImg = srcMatch ? srcMatch[1] : null;
    }

    console.log(decodedContent);
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

    let regex = /<div style="display: none;">\*\*Lead\*(.*?)\*\*<\/div>/; // Regular expression to match the lead
    let matchLead = page.content.match(regex); // Execute the regular expression
    let lead = matchLead ? matchLead[1] : null; // If a match is found, extract the lead. Otherwise, lead is null.

    parsedContent.content = decodedContent;
    parsedContent.title = page.title;
    parsedContent.lead = lead ? lead : '';
    return parsedContent;
  }
}
