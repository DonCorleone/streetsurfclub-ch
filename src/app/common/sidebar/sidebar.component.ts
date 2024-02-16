import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true
})
export class SidebarComponent {

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

}