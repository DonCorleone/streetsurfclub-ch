import { Component } from '@angular/core';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-awcl-testimonials',
    templateUrl: './awcl-testimonials.component.html',
    styleUrls: ['./awcl-testimonials.component.scss'],
    standalone: true,
    imports: [CarouselModule]
})
export class AwclTestimonialsComponent {

    testimonialsSlides: OwlOptions = {
        items: 1,
		nav: true,
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