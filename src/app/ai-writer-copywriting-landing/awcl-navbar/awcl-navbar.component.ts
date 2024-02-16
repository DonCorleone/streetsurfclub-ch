import { Component, HostListener } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-awcl-navbar',
    templateUrl: './awcl-navbar.component.html',
    styleUrls: ['./awcl-navbar.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf]
})
export class AwclNavbarComponent {

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
            element.scrollIntoView({ behavior: 'smooth' });
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