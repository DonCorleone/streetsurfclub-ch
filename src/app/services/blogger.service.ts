import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

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

  constructor(private httpClient: HttpClient) {
  }
}
