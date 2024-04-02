import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, catchError, from, map, of} from 'rxjs';
import {Page, PageResponse} from "../models/pages";
import {Post, PostResponse} from "../models/posts";


@Injectable({
  providedIn: 'root',
})
export class BloggerService {

  constructor(private httpClient: HttpClient) {
  }

  private async getAllPages(): Promise<Page[]> {
    const url = 'http://localhost:3000/pageList';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.items ?? [];
    } else {
      return [];
    }
  }

  private async getAllPosts(): Promise<Post[]> {
    const url = 'http://localhost:3000/postList';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.items ?? [];
    } else {
      return [];
    }
  }

  // call the promise getAllPages() and return the first page as an osbservable
  getPost(postId: string): Observable<Post | null> {
    if (isDevMode()) {
      console.log('Development Mode');
      return from(this.getAllPosts()).pipe(
        map(posts => posts.find(post => post.id === postId) ?? null),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      );
    } else {
      console.log('Production Mode');
      return this.httpClient.get<Post>('.netlify/functions/get-post?postId=' + postId);
    }
  }

  getPage(pageId: string): Observable<Page | null> {
    if (isDevMode()) {
      console.log('Development Mode');
      return from(this.getAllPages()).pipe(
        map(posts => posts.find(page => page.id === pageId) ?? null),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      );
    } else {
      console.log('Production Mode');
      return this.httpClient.get<Page>('.netlify/functions/get-page?pageId=' + pageId);
    }
  }

  getPages(): Observable<Page[]> {
    if (isDevMode()) {
      console.log('Development Mode');
      return from(this.getAllPages()).pipe(
        catchError(err => {
          console.error(err);
          return of([]);
        })
      );
    } else {
      console.log('Production Mode');
      return this.httpClient.get<PageResponse>('.netlify/functions/list-pages').pipe(
        map(response => response.items ?? []),
        catchError(err => {
          console.error(err);
          return of([]);
        }));
    }
  }

  getPosts(): Observable<Post[]> {
    if (isDevMode()) {
      console.log('Development Mode');
      return from(this.getAllPosts()).pipe(
        catchError(err => {
          console.error(err);
          return of([]);
        })
      );
    } else {
      console.log('Production Mode');
      return this.httpClient.get<PostResponse>('.netlify/functions/list-posts').pipe(
        map(response => response.items ?? []),
        catchError(err => {
            console.error(err);
            return of([]);
          }
        ));
    }
  }
}
