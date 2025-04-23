import {Component, inject, OnInit} from '@angular/core';
import {BloggerComment} from "../../models/comment";
import {BloggerService} from "../../services/blogger.service";

@Component({
  selector: 'app-ancal-faq',
  templateUrl: './ancal-faq.component.html',
  styleUrls: ['./ancal-faq.component.css'],
})
export class AncalFaqComponent implements OnInit {

  private bloggerService = inject(BloggerService);

  // Accordion
  contentHeight: number = 0;
  openSectionIndex: number = 0; // Set to 0 to open the first section by default
  comments: BloggerComment[] = [];

  toggleSection(index: number): void {
    if (this.openSectionIndex === index) {
      this.openSectionIndex = -1;
    } else {
      this.openSectionIndex = index;
      this.calculateContentHeight();
    }
  }

  isSectionOpen(index: number): boolean {
    return this.openSectionIndex === index;
  }

  calculateContentHeight(): void {
    const contentElement = document.querySelector('.accordion-content');
    if (contentElement) {
      this.contentHeight = contentElement.scrollHeight;
    }
  }

  ngOnInit(): void {

    // inject the comments from the service
    this.bloggerService.getComments('940777483961202531').subscribe((comments: BloggerComment[]) => {
      this.comments = comments;
    });
  }
}
