import {Component, inject, input, OnInit,} from '@angular/core';
import {BloggerComment} from "../../models/comment";
import {BloggerService} from "../../services/blogger.service";
import {CommentDialogComponent} from "../../common/comment-dialog/comment-dialog.component";

@Component({
  selector: 'app-ancal-faq',
  templateUrl: './ancal-faq.component.html',
  styleUrls: ['./ancal-faq.component.css'],
  imports: [
    CommentDialogComponent
  ]
})
export class AncalFaqComponent implements OnInit {

  currentPostId = input.required<string>();

  private bloggerService = inject(BloggerService);

  comments: BloggerComment[] = [];
  openSections: boolean[] = []; // Array to track open state of each section
  type = 'post';
  isCommentsOpen = false;

  toggleSection(index: number): void {
    this.openSections[index] = !this.openSections[index]; // Toggle the state of the clicked section
  }

  isSectionOpen(index: number): boolean {
    return this.openSections[index]; // Return the state of the section
  }

  ngOnInit(): void {
    this.bloggerService.getComments('940777483961202531').subscribe((comments: BloggerComment[]) => {
      this.comments = comments;
      this.openSections = new Array(comments.length).fill(true); // Initialize all sections as closed
    });
  }

  openComments() {
    this.isCommentsOpen = true;
  }

  closeComments() {
    this.isCommentsOpen = false;
  }
}
