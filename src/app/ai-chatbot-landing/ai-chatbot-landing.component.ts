import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AclFooterComponent } from './acl-footer/acl-footer.component';
import { AclCtaComponent } from './acl-cta/acl-cta.component';
import { AclBlogComponent } from './acl-blog/acl-blog.component';
import { AclFaqComponent } from './acl-faq/acl-faq.component';
import { AclPricingComponent } from './acl-pricing/acl-pricing.component';
import { AclIntegrationsComponent } from './acl-integrations/acl-integrations.component';
import { AclTestimonialsComponent } from './acl-testimonials/acl-testimonials.component';
import { AclWhatWeDoComponent } from './acl-what-we-do/acl-what-we-do.component';
import { AclBrandsComponent } from './acl-brands/acl-brands.component';
import { AclAboutComponent } from './acl-about/acl-about.component';
import { AclFeaturesComponent } from './acl-features/acl-features.component';
import { AclBannerComponent } from './acl-banner/acl-banner.component';
import { AclNavbarComponent } from './acl-navbar/acl-navbar.component';

@Component({
    selector: 'app-ai-chatbot-landing',
    templateUrl: './ai-chatbot-landing.component.html',
    styleUrls: ['./ai-chatbot-landing.component.scss'],
    standalone: true,
    imports: [AclNavbarComponent, AclBannerComponent, AclFeaturesComponent, AclAboutComponent, AclBrandsComponent, AclWhatWeDoComponent, AclTestimonialsComponent, AclIntegrationsComponent, AclPricingComponent, AclFaqComponent, AclBlogComponent, AclCtaComponent, AclFooterComponent]
})
export class AiChatbotLandingComponent {

    title = 'AI Chatbot Landing - Canora';

    constructor(private titleService:Title) {}
    
    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}