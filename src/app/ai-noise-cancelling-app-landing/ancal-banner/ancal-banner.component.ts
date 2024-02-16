import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-ancal-banner',
    templateUrl: './ancal-banner.component.html',
    styleUrls: ['./ancal-banner.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class AncalBannerComponent {

    // Video Popup
    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }

}