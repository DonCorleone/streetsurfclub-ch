import { Component } from '@angular/core';
import { FooterComponent } from '../common/footer/footer.component';
import { NavbarComponent } from '../common/navbar/navbar.component';
import {AsyncPipe, NgIf} from "@angular/common";
import {Observable} from "rxjs/internal/Observable";
import {SafeHtmlPipe} from "../pipes/safe-html-pipe";
import {BloggerPage, BloggerService} from "../services/blogger.service";
import {EMPTY} from "rxjs/internal/observable/empty";

@Component({
    selector: 'app-blog-details-page',
    templateUrl: './blog-details-page.component.html',
    standalone: true,
  imports: [NavbarComponent, FooterComponent, NgIf, AsyncPipe, SafeHtmlPipe]
})
export class BlogDetailsPageComponent {
  page$ = this.bloggerService.getPage();
  constructor(private bloggerService: BloggerService) {}
}
