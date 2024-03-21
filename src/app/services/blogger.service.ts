import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface BloggerPage {
  kind: string;
  id: string;
  blog: {
    id: string;
  };
  published: string;
  updated: string;
  url: string;
  selfLink: string;
  title: string;
  content: string;
  author: {
    id: string;
    displayName: string;
    url: string;
    image: {
      url: string;
    };
  };
  etag: string;
}

export interface Blog {
  kind: string;
  id: string;
  name: string;
  description: string;
  published: string;
  updated: string;
  url: string;
  selfLink: string;
  posts: {
    totalItems: number;
    selfLink: string;
  };
  pages: {
    totalItems: number;
    selfLink: string;
  };
  locale: {
    language: string;
    country: string;
    variant: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class BloggerService {

  blogs$ = this.httpClient.get<Blog>('.netlify/functions/list-blog');
  pages$ = this.httpClient.get<Blog>('.netlify/functions/list-pages');
  page$ = this.httpClient.get<BloggerPage>('.netlify/functions/get-page');

  constructor(private httpClient: HttpClient) {
  }
}
