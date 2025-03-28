import { Component, HostListener, Input, inject } from '@angular/core';
import {RouterLink} from '@angular/router';
import {AsyncPipe, NgClass} from '@angular/common';
import {DarkmodeService} from "../../services/darkmode.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    imports: [NgClass, RouterLink, AsyncPipe]
})
export class NavbarComponent {
  private darkmodeService = inject(DarkmodeService);


  // Navbar Sticky
  isSticky: boolean = false;
  isDarkMode$ = this.darkmodeService.isDarkMode$;
  @Input() type!: "post" | "page" | null;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= 50) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }
}
