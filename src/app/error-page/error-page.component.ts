import { Component } from '@angular/core';
import { FooterComponent } from '../common/footer/footer.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../common/navbar/navbar.component';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    imports: [NavbarComponent, RouterLink, FooterComponent]
})
export class ErrorPageComponent {

}
