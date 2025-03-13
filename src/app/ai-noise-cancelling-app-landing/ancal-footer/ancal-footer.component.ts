import {Component} from '@angular/core';
import {Page} from "../../models/pages";
import {SafeHtmlPipe} from "../../pipes/safe-html-pipe";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {BloggerService} from "../../services/blogger.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-ancal-footer',
    templateUrl: './ancal-footer.component.html',
    imports: [
        SafeHtmlPipe,
        NgIf,
        RouterLink,
        NgForOf
    ]
})
export class AncalFooterComponent {

  supports: Page[] = [];
  terms: Page[] = [];
  resources: Page[] = [];
  quickLinks: Page[] = [];

  constructor(private bloggerService: BloggerService) {
    this.bloggerService.pages$.pipe(
      takeUntilDestroyed()
    ).subscribe(pages => {
      if (pages.length > 0) {
        this.quickLinks = this.bloggerService.quickLinks;
        this.resources = this.bloggerService.resources;
        this.terms = this.bloggerService.terms;
        this.supports = this.bloggerService.supports;
      }
    });
  }
}
