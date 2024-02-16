import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-adml-cta',
    templateUrl: './adml-cta.component.html',
    styleUrls: ['./adml-cta.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class AdmlCtaComponent {

    // Contact Popup
    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }

}