import { Component, inject } from '@angular/core';
import {RouterLink} from '@angular/router';
import { AsyncPipe } from "@angular/common";
import {Observable, ObservableInput, takeUntil, tap} from "rxjs";
import {DarkmodeService} from "../../services/darkmode.service";
import {Page} from "../../models/pages";
import {BloggerService} from "../../services/blogger.service";
import {SafeHtmlPipe} from "../../pipes/safe-html-pipe";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    imports: [RouterLink, AsyncPipe, SafeHtmlPipe]
})
export class FooterComponent {
  private darkmodeService = inject(DarkmodeService);
  private bloggerService = inject(BloggerService);

  isDarkMode$ = this.darkmodeService.isDarkMode$;

  private destroy$: ObservableInput<any> = new Observable();
  quickLinks: Page[] = [];
  resources: Page[] = [];
  terms: Page[] = [];
  supports: Page[] = [];

  constructor() {
    this.bloggerService.pages$.pipe(
      takeUntilDestroyed(),
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
