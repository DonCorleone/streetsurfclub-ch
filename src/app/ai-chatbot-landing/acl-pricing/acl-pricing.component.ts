import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-acl-pricing',
    templateUrl: './acl-pricing.component.html',
    styleUrls: ['./acl-pricing.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf]
})
export class AclPricingComponent {

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}