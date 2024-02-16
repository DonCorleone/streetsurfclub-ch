import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppmlFooterComponent } from './appml-footer/appml-footer.component';
import { AppmlCtaComponent } from './appml-cta/appml-cta.component';
import { AppmlFaqComponent } from './appml-faq/appml-faq.component';
import { AppmlTestimonialsComponent } from './appml-testimonials/appml-testimonials.component';
import { AppmlGetStartedComponent } from './appml-get-started/appml-get-started.component';
import { AppmlHowItsWorksComponent } from './appml-how-its-works/appml-how-its-works.component';
import { AppmlFunfactsComponent } from './appml-funfacts/appml-funfacts.component';
import { AppmlAboutComponent } from './appml-about/appml-about.component';
import { AppmlFeaturesComponent } from './appml-features/appml-features.component';
import { AppmlBannerComponent } from './appml-banner/appml-banner.component';
import { AppmlNavbarComponent } from './appml-navbar/appml-navbar.component';

@Component({
    selector: 'app-ai-profile-picture-maker-landing',
    templateUrl: './ai-profile-picture-maker-landing.component.html',
    styleUrls: ['./ai-profile-picture-maker-landing.component.scss'],
    standalone: true,
    imports: [AppmlNavbarComponent, AppmlBannerComponent, AppmlFeaturesComponent, AppmlAboutComponent, AppmlFunfactsComponent, AppmlHowItsWorksComponent, AppmlGetStartedComponent, AppmlTestimonialsComponent, AppmlFaqComponent, AppmlCtaComponent, AppmlFooterComponent]
})
export class AiProfilePictureMakerLandingComponent {

    title = 'AI Profile Picture Maker Landing - Canora';

    constructor(private titleService:Title) {}
    
    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}