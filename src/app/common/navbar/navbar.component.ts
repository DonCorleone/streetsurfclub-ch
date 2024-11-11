import {Component, HostListener, Input} from '@angular/core';
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
  @Input() type!: "post" | "page" | null;

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
