import { Injectable, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Blog } from '../interfaces/blog.interface';

const DEFAULT_LOCALE = 'en_US';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);


  updateMetaForBlog(blog: Blog): void {
    try {
      this.clearMetaTags();
      this.titleService.setTitle(blog.name);
      
      const nameTags: MetaDefinition[] = [
        { name: 'description', content: `${blog.name} - ${blog.description}` },
        { name: 'keywords', content: blog.keywords?.join(', ') || '' },
        { name: 'author', content: blog.author || '' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: blog.name },
        { name: 'twitter:description', content: blog.description },
        { name: 'twitter:image', content: blog.image || '' }
      ];

      const propertyTags: MetaDefinition[] = [
        { property: 'og:title', content: blog.name },
        { property: 'og:description', content: blog.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: blog.image || '' },
        { property: 'og:url', content: blog.url || window.location.href },
        { property: 'og:locale', content: blog.locale || DEFAULT_LOCALE }
      ];

      nameTags.forEach(tag => this.meta.updateTag(tag));
      propertyTags.forEach(tag => this.meta.updateTag(tag));
      
    } catch (error) {
      console.error('Error updating meta tags:', error);
      throw new Error('Failed to update meta tags');
    }
  }

  private clearMetaTags(): void {
    ['description', 'keywords', 'author', 'twitter:card', 'twitter:title', 
     'twitter:description', 'twitter:image', 'og:title', 'og:description', 
     'og:type', 'og:image', 'og:url', 'og:locale']
      .forEach(tag => this.meta.removeTag(tag.startsWith('og:') ? `property='${tag}'` : `name='${tag}'`));
  }
}
