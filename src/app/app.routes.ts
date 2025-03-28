import { Routes } from '@angular/router';





export const routes: Routes = [
  {path: '', loadComponent: () => import('./ai-noise-cancelling-app-landing/ai-noise-cancelling-app-landing.component').then(m => m.AiNoiseCancellingAppLandingComponent)},
  {path: 'blog', loadComponent: () => import('./blog-page/blog-page.component').then(m => m.BlogPageComponent)},
  {path: 'blog/blog-details/:id', loadComponent: () => import('./blog-details-page/blog-details-page.component').then(m => m.BlogDetailsPageComponent)},
  {path: 'blog/blog-details/:type/:id', loadComponent: () => import('./blog-details-page/blog-details-page.component').then(m => m.BlogDetailsPageComponent)},
  // Here add new pages component

  {path: '**', loadComponent: () => import('./error-page/error-page.component').then(m => m.ErrorPageComponent)} // This line will remain down from the whole pages component list
];
