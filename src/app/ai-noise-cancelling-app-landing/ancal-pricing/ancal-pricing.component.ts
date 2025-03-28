import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-ancal-pricing',
    templateUrl: './ancal-pricing.component.html',
    styleUrls: ['./ancal-pricing.component.css'],
    imports: [NgClass]
})
export class AncalPricingComponent {

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}