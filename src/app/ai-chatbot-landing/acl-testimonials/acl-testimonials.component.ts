import { Component } from '@angular/core';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-acl-testimonials',
    templateUrl: './acl-testimonials.component.html',
    styleUrls: ['./acl-testimonials.component.scss'],
    standalone: true,
    imports: [CarouselModule]
})
export class AclTestimonialsComponent {

    testimonialsSlides: OwlOptions = {
        items: 1,
		nav: false,
		margin: 25,
		loop: true,
		dots: true,
		autoplay: false,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
		]
    }

}