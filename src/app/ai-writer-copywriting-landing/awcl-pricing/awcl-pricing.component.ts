import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-awcl-pricing',
    templateUrl: './awcl-pricing.component.html',
    styleUrls: ['./awcl-pricing.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf]
})
export class AwclPricingComponent {

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}