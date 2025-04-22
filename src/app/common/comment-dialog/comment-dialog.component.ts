import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { BloggerService } from '../../services/blogger.service';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-comment-dialog',
  standalone: true,
  templateUrl: './comment-dialog.component.html',
  imports: [
    DatePipe
  ]
})
export class CommentDialogComponent {
  @Input() postId!: string;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  private bloggerService = inject(BloggerService);

  comments: any[] = [];
  newComment = {
    author: '',
    content: '',
    timestamp: new Date()
  };

  ngOnInit() {
    if (this.postId) {
      this.loadComments();
    }
  }

  loadComments() {
    this.bloggerService.getComments(this.postId).subscribe(comments => {
      this.comments = comments;
    });
  }

  closeDialog() {
    this.closeModal.emit();
  }

  async submitComment(event: Event) {
    event.preventDefault();

    const comment = {
      postId: this.postId,
      author: this.newComment.author,
      content: this.newComment.content,
      timestamp: new Date()
    };

    this.bloggerService.addComment(comment).subscribe({
      next: (newComment) => {
        this.comments = [...this.comments, newComment];
        // Reset form
        this.newComment = {
          author: '',
          content: '',
          timestamp: new Date()
        };
      },
      error: (error) => {
        console.error('Failed to post comment:', error);
        // TODO: Show error message to user
      }
    });
  }
}
