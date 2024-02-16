import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AwclFooterComponent } from './awcl-footer/awcl-footer.component';
import { AwclCtaComponent } from './awcl-cta/awcl-cta.component';
import { AwclBlogComponent } from './awcl-blog/awcl-blog.component';
import { AwclFaqComponent } from './awcl-faq/awcl-faq.component';
import { AwclGetStartedComponent } from './awcl-get-started/awcl-get-started.component';
import { AwclPricingComponent } from './awcl-pricing/awcl-pricing.component';
import { AwclWhatWeDoComponent } from './awcl-what-we-do/awcl-what-we-do.component';
import { AwclTestimonialsComponent } from './awcl-testimonials/awcl-testimonials.component';
import { AwclAboutComponent } from './awcl-about/awcl-about.component';
import { AwclFeaturesComponent } from './awcl-features/awcl-features.component';
import { AwclBannerComponent } from './awcl-banner/awcl-banner.component';
import { AwclNavbarComponent } from './awcl-navbar/awcl-navbar.component';

@Component({
    selector: 'app-ai-writer-copywriting-landing',
    templateUrl: './ai-writer-copywriting-landing.component.html',
    styleUrls: ['./ai-writer-copywriting-landing.component.scss'],
    standalone: true,
    imports: [AwclNavbarComponent, AwclBannerComponent, AwclFeaturesComponent, AwclAboutComponent, AwclTestimonialsComponent, AwclWhatWeDoComponent, AwclPricingComponent, AwclGetStartedComponent, AwclFaqComponent, AwclBlogComponent, AwclCtaComponent, AwclFooterComponent]
})
export class AiWriterCopywritingLandingComponent {

    title = 'AI Writer & Copywriting Landing - Canora';

    constructor(private titleService:Title) {}
    
    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}