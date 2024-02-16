import { Component } from '@angular/core';
import { FooterComponent } from '../common/footer/footer.component';
import { NavbarComponent } from '../common/navbar/navbar.component';

@Component({
    selector: 'app-blog-details-page',
    templateUrl: './blog-details-page.component.html',
    styleUrls: ['./blog-details-page.component.scss'],
    standalone: true,
    imports: [NavbarComponent, FooterComponent]
})
export class BlogDetailsPageComponent {

}
