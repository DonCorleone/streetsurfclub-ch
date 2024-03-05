import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';
import {DarkmodeService} from "../../services/darkmode.service";

@Component({
  selector: 'app-ancal-navbar',
  templateUrl: './ancal-navbar.component.html',
  styleUrls: ['./ancal-navbar.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AncalNavbarComponent {

  isDarkMode$ = this.darkmodeService.isDarkMode$;

  constructor(private darkmodeService: DarkmodeService) {
  }

  // Active toggleClass
  classApplied = false;

  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  // Section to Section Scroll
  activeSection: string | null = null;

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
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
