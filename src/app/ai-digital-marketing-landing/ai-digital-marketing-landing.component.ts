import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdmlFooterComponent } from './adml-footer/adml-footer.component';
import { AdmlBlogComponent } from './adml-blog/adml-blog.component';
import { AdmlCtaComponent } from './adml-cta/adml-cta.component';
import { AdmlWhatCanoraDoComponent } from './adml-what-canora-do/adml-what-canora-do.component';
import { AdmlServicesComponent } from './adml-services/adml-services.component';
import { AdmlTestimonialsComponent } from './adml-testimonials/adml-testimonials.component';
import { AdmlFeaturesComponent } from './adml-features/adml-features.component';
import { AdmlAboutComponent } from './adml-about/adml-about.component';
import { AdmlPartnersComponent } from './adml-partners/adml-partners.component';
import { AdmlBannerComponent } from './adml-banner/adml-banner.component';
import { AdmlNavbarComponent } from './adml-navbar/adml-navbar.component';

@Component({
    selector: 'app-ai-digital-marketing-landing',
    templateUrl: './ai-digital-marketing-landing.component.html',
    styleUrls: ['./ai-digital-marketing-landing.component.scss'],
    standalone: true,
    imports: [AdmlNavbarComponent, AdmlBannerComponent, AdmlPartnersComponent, AdmlAboutComponent, AdmlFeaturesComponent, AdmlTestimonialsComponent, AdmlServicesComponent, AdmlWhatCanoraDoComponent, AdmlCtaComponent, AdmlBlogComponent, AdmlFooterComponent]
})
export class AiDigitalMarketingLandingComponent {

    title = 'AI Digital Marketing Landing - Canora';

    constructor(private titleService:Title) {}
    
    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}