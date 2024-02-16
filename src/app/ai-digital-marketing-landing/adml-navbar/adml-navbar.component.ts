import { Component, HostListener } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-adml-navbar',
    templateUrl: './adml-navbar.component.html',
    styleUrls: ['./adml-navbar.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf]
})
export class AdmlNavbarComponent {

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

}