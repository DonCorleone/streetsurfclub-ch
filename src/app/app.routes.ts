import { Routes } from '@angular/router';
import {
  AiNoiseCancellingAppLandingComponent
} from "./ai-noise-cancelling-app-landing/ai-noise-cancelling-app-landing.component";
import {BlogPageComponent} from "./blog-page/blog-page.component";
import {BlogDetailsPageComponent} from "./blog-details-page/blog-details-page.component";
import {ErrorPageComponent} from "./error-page/error-page.component";

export const routes: Routes = [
  {path: '', component: AiNoiseCancellingAppLandingComponent},
  {path: 'blog', component: BlogPageComponent},
  {path: 'blog/blog-details/:id', component: BlogDetailsPageComponent},
  // Here add new pages component

  {path: '**', component: ErrorPageComponent} // This line will remain down from the whole pages component list
];
