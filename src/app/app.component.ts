import {Component, isDevMode, OnInit} from '@angular/core';
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
import {BloggerService} from './services/blogger.service';
import {SafeHtmlPipe} from "./pipes/safe-html-pipe";
import {Observable, take} from "rxjs";
import {Page} from "./models/pages";

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
  constructor(private router: Router) {
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
    if (isDevMode()){
      console.log('Development Mode');
    }else{
      console.log('Production Mode');
    }
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
