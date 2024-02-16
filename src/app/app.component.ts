import { Component } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd, RouterOutlet } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';
import * as AOS from "aos";
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ],
    standalone: true,
    imports: [RouterOutlet, NgxScrollTopModule, SidebarComponent]
})
export class AppComponent {
    
    title = 'Canora - Angular 17 Tailwind AI Startup One Page Template';
    
    location: any;
    routerSubscription: any;

    constructor(
        public router: Router
    ) {
        AOS.init();
    }

    ngOnInit(){
        this.recallJsFuntions();
    }

    recallJsFuntions() {
        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
        .subscribe(event => {
            this.location = this.router.url;
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }
    
}