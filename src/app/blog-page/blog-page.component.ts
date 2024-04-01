import {Component} from '@angular/core';
import {FooterComponent} from '../common/footer/footer.component';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../common/navbar/navbar.component';
import {BloggerService} from '../services/blogger.service';
import {Observable} from "rxjs";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {Post} from "../models/posts";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FooterComponent, AsyncPipe, NgForOf, DatePipe]
})
export class BlogPageComponent {

  pages$: Observable<Post[]>;

  constructor(private bloggerService: BloggerService) {
    this.pages$ = this.bloggerService.getPosts();
  }
}
