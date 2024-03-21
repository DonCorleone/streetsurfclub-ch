import {Component, OnInit} from '@angular/core';
import {
  Router,
  NavigationCancel,
  NavigationEnd,
  RouterOutlet,
} from '@angular/router';
import {
  AsyncPipe, JsonPipe,
  Location,
  LocationStrategy, NgIf,
  PathLocationStrategy,
} from '@angular/common';
import {filter} from 'rxjs/operators';
import * as AOS from 'aos';
import {NgxScrollTopModule} from 'ngx-scrolltop';
import {SidebarComponent} from './common/sidebar/sidebar.component';
import {BloggerPage, BloggerService} from './services/blogger.service';
import {SafeHtmlPipe} from "./pipes/safe-html-pipe";
import {Observable} from "rxjs/internal/Observable";
import {EMPTY} from "rxjs/internal/observable/empty";
import {map} from "rxjs/internal/operators/map";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
  standalone: true,
  imports: [RouterOutlet, NgxScrollTopModule, SidebarComponent, AsyncPipe, JsonPipe, NgIf, SafeHtmlPipe],
})
export class AppComponent implements OnInit {
  title = 'Canora - Angular 17 Tailwind AI Startup One Page Template';

  location: any;
  routerSubscription: any;

  blogs$ = this.bloggerService.blogs$;
  pages$ = this.bloggerService.pages$;
  page$: Observable<BloggerPage> = EMPTY;
  h1: any;

  constructor(private bloggerService: BloggerService, private router: Router) {


    AOS.init();
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      console.log('User prefers a dark color scheme');
    } else {
      console.log('User prefers a light color scheme');
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const newColorScheme = event.matches ? 'dark' : 'light';
        console.log('User now prefers a ' + newColorScheme + ' color scheme');
      });
  }

  ngOnInit() {
    this.recallJsFuntions();

    this.page$ = this.bloggerService.page$.pipe(
      map((page) => {

        let regex = /<h1.*?>(.*?)<\/h1>/;
        let match = page.content.match(regex);
        this.h1 = match ? match[1] : null;
        return page;
      })
    );
  }

  recallJsFuntions() {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd || event instanceof NavigationCancel
        )
      )
      .subscribe((event) => {
        this.location = this.router.url;
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
  }
}
