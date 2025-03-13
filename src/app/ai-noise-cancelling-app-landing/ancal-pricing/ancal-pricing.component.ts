import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-ancal-pricing',
    templateUrl: './ancal-pricing.component.html',
    styleUrls: ['./ancal-pricing.component.scss'],
    imports: [NgClass, NgIf]
})
export class AncalPricingComponent {

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}