import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {DarkmodeService} from "../../services/darkmode.service";
import {BloggerService} from "../../services/blogger.service";
import {Observable} from "rxjs";
import {Page} from "../../models/pages";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-ancal-navbar',
  templateUrl: './ancal-navbar.component.html',
  styleUrls: ['./ancal-navbar.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, AsyncPipe, NgForOf, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AncalNavbarComponent {

  isDarkMode$ = this.darkmodeService.isDarkMode$;
  pages$: Observable<Page[]> = this.bloggerService.getPages();

  constructor(private darkmodeService: DarkmodeService, private bloggerService: BloggerService) {
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Section to Section Scroll
  activeSection: string | null = null;

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView(true);

      this.toggleMenu();
    }
  }

  // Navbar Sticky
  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= 50) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  // Contact Popup
  isOpen = false;

  openPopup(): void {
    this.isOpen = true;
  }

  closePopup(): void {
    this.isOpen = false;
  }

  // Signin/Signup Popup
  isSigninSignupOpen = false;

  openSigninSignupPopup(): void {
    this.isSigninSignupOpen = true;
  }

  closeSigninSignupPopup(): void {
    this.isSigninSignupOpen = false;
  }

  // Tabs
  currentTab = 'tab1';

  switchTab(event: MouseEvent, tab: string) {
    event.preventDefault();
    this.currentTab = tab;
  }

}
