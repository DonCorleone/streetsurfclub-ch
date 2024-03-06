import {Component, HostListener} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AsyncPipe, NgClass} from '@angular/common';
import {DarkmodeService} from "../../services/darkmode.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [NgClass, RouterLink, AsyncPipe]
})
export class NavbarComponent {

  // Navbar Sticky
  isSticky: boolean = false;
  isDarkMode$ = this.darkmodeService.isDarkMode$;

  constructor(private darkmodeService: DarkmodeService) {
  }

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
