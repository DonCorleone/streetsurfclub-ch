import { Component } from '@angular/core';
import { FooterComponent } from '../common/footer/footer.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../common/navbar/navbar.component';

@Component({
    selector: 'app-blog-page',
    templateUrl: './blog-page.component.html',
    standalone: true,
    imports: [NavbarComponent, RouterLink, FooterComponent]
})
export class BlogPageComponent {

}
