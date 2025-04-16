import { Routes } from '@angular/router';





export const routes: Routes = [
  {path: '', loadComponent: () => import('./ai-noise-cancelling-app-landing/ai-noise-cancelling-app-landing.component').then(m => m.AiNoiseCancellingAppLandingComponent)},
  {path: 'blog', loadComponent: () => import('./blog-page/blog-page.component').then(m => m.BlogPageComponent)},
  {path: 'blog/blog-details/:id', loadComponent: () => import('./blog-details-page/blog-details-page.component').then(m => m.BlogDetailsPageComponent)},
  {path: 'blog/blog-details/:type/:id', loadComponent: () => import('./blog-details-page/blog-details-page.component').then(m => m.BlogDetailsPageComponent)},
  // Here add new pages component
  {path: 'ancalblog', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-blog/ancal-blog.component').then(m => m.AncalBlogComponent)},
  {path: 'banner', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-banner/ancal-banner.component').then(m => m.AncalBannerComponent)},
  {path: 'brands', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-brands/ancal-brands.component').then(m => m.AncalBrandsComponent)},
  {path: 'cta', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-cta/ancal-cta.component').then(m => m.AncalCtaComponent)},
  {path: 'download', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-download/ancal-download.component').then(m => m.AncalDownloadComponent)},
  {path: 'faq', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-faq/ancal-faq.component').then(m => m.AncalFaqComponent)},
  {path: 'features', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-features/ancal-features.component').then(m => m.AncalFeaturesComponent)},
  {path: 'footer', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-footer/ancal-footer.component').then(m => m.AncalFooterComponent)},
  {path: 'navbar', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-navbar/ancal-navbar.component').then(m => m.AncalNavbarComponent)},
  {path: 'pricing', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-pricing/ancal-pricing.component').then(m => m.AncalPricingComponent)},
  {path: 'supported', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-supported/ancal-supported.component').then(m => m.AncalSupportedComponent)},
  {path: 'test', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-test-canora/ancal-test-canora.component').then(m => m.AncalTestCanoraComponent)},
  {path: 'testimonials', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-testimonials/ancal-testimonials.component').then(m => m.AncalTestimonialsComponent)},
  {path: 'whatwedo', loadComponent: () => import('../app/ai-noise-cancelling-app-landing/ancal-what-we-do/ancal-what-we-do.component').then(m => m.AncalWhatWeDoComponent)},
  {path: '**', loadComponent: () => import('./error-page/error-page.component').then(m => m.ErrorPageComponent)} // This line will remain down from the whole pages component list
];
