import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiNoiseCancellingAppLandingComponent } from './ai-noise-cancelling-app-landing/ai-noise-cancelling-app-landing.component';
import { AiChatbotLandingComponent } from './ai-chatbot-landing/ai-chatbot-landing.component';
import { AiWriterCopywritingLandingComponent } from './ai-writer-copywriting-landing/ai-writer-copywriting-landing.component';
import { AiProfilePictureMakerLandingComponent } from './ai-profile-picture-maker-landing/ai-profile-picture-maker-landing.component';
import { AiDigitalMarketingLandingComponent } from './ai-digital-marketing-landing/ai-digital-marketing-landing.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './blog-details-page/blog-details-page.component';

const routes: Routes = [
    {path: '', component: AiNoiseCancellingAppLandingComponent},
    {path: 'index-2', component: AiChatbotLandingComponent},
    {path: 'index-3', component: AiWriterCopywritingLandingComponent},
    {path: 'index-4', component: AiProfilePictureMakerLandingComponent},
    {path: 'index-5', component: AiDigitalMarketingLandingComponent},
    {path: 'blog', component: BlogPageComponent},
    {path: 'blog/blog-details', component: BlogDetailsPageComponent},
    // Here add new pages component

    {path: '**', component: ErrorPageComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }