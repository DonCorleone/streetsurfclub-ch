import { Component, isDevMode, OnInit, inject } from '@angular/core';
import {
  Router,
  NavigationCancel,
  NavigationEnd,
  RouterOutlet,
} from '@angular/router';
import {
  Location,
  LocationStrategy, 
  PathLocationStrategy,
} from '@angular/common';
import {filter} from 'rxjs/operators';
import Aos from 'aos';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
        Location,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
    imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  title = 'ToDo Title';

  location: any;
  routerSubscription: any;

  constructor() {
    // Initialize AOS
    Aos.init(
      {
        duration: 1000,
        once: true,
        mirror: false,
        disable: 'mobile',
      }
    );

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
