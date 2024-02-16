import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-ancal-faq',
    templateUrl: './ancal-faq.component.html',
    styleUrls: ['./ancal-faq.component.scss'],
    standalone: true,
    imports: [NgClass]
})
export class AncalFaqComponent {

    // Accordion
    contentHeight: number = 0;
    openSectionIndex: number = 0; // Set to 0 to open the first section by default
    toggleSection(index: number): void {
        if (this.openSectionIndex === index) {
            this.openSectionIndex = -1;
        } else {
            this.openSectionIndex = index;
            this.calculateContentHeight();
        }
    }
    isSectionOpen(index: number): boolean {
        return this.openSectionIndex === index;
    }
    calculateContentHeight(): void {
        const contentElement = document.querySelector('.accordion-content');
        if (contentElement) {
            this.contentHeight = contentElement.scrollHeight;
        }
    }

}