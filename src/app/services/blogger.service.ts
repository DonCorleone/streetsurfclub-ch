import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, catchError, from, map, of} from 'rxjs';
import {Page, PageResponse} from "../models/pages";
import {Post, PostResponse} from "../models/posts";
import {BlogResponse} from "../models/blog";


@Injectable({
  providedIn: 'root',
})
export class BloggerService {

  constructor(private httpClient: HttpClient) {}

  private async getBlogMock(): Promise<BlogResponse | null>  {
    const url = 'http://localhost:3000/blog';
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
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
  getPost(postid: string): Observable<Post | null> {
    if (isDevMode()) {
      console.log('Development Mode');
      return from(this.getAllPosts()).pipe(
        map(posts => posts.find(post => post.id === postid) ?? null),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      );
    } else {
      console.log('Production Mode');
      return this.httpClient.get<Post>('.netlify/functions/get-post?postid=' + postid);
    }
  }

  findPost(q: string): Observable<Post | null> {
    if (isDevMode()) {
      console.log('Development Mode');
      return from(this.getAllPosts()).pipe(
        map(posts => {
          if (!q) {
            return null;
          };
          if (!posts || posts.length === 0) {
            return null;
          }

          const post = posts.find(x => x.content?.indexOf(q) > 0);
          return post ?? posts[0];
        }),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      );
    } else {
      console.log('Production Mode');
      const encodedQ = encodeURIComponent(q);
      return this.httpClient.get<PostResponse>('.netlify/functions/find-post?encodedQ=' + encodedQ).pipe(
      map(response => response.items ?  response.items[0] : null),
        catchError(err => {
          console.error(err);
          return of(null);
        }));
    }
  }

  getBlog(): Observable<BlogResponse | null> {
    if (isDevMode()) {
      console.log('Development Mode');
      return from(this.getBlogMock()).pipe(
        catchError(err => {
          console.error(err);
          return of(null);
        })
      );
    } else {
      console.log('Production Mode');
      return this.httpClient.get<BlogResponse>('.netlify/functions/get-blog');
    }
  }
  getPage(pageid: string): Observable<Page | null> {
    if (isDevMode()) {
      console.log('Development Mode');
      return from(this.getAllPages()).pipe(
        map(posts => posts.find(page => page.id === pageid) ?? null),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      );
    } else {
      console.log('Production Mode');
      return this.httpClient.get<Page>('.netlify/functions/get-page?pageid=' + pageid);
    }
  }

  getPages(): Observable<Page[]> {
    if (isDevMode()) {
      console.log('Development Mode');
      return from(this.getAllPages()).pipe(
        map(pages => this.sortItems(pages)),
        catchError(err => {
          console.error(err);
          return of([]);
        })
      );
    } else {
      console.log('Production Mode');
      return this.httpClient.get<PageResponse>('.netlify/functions/list-pages').pipe(
        map(response => response.items ? this.sortItems(response.items) : []),
        catchError(err => {
          console.error(err);
          return of([]);
        }));
    }
  }

  private sortItems(items: Page[]): Page[] {
    return items.sort((a, b) => {
      const pattern = /sortorder="(\d+)"/;
      const matchA = pattern.exec(a.title);
      const matchB = pattern.exec(b.title);
      const sortOrderA = matchA ? parseInt(matchA[1], 10) : 0;
      const sortOrderB = matchB ? parseInt(matchB[1], 10) : 0;
      return sortOrderA - sortOrderB;
    });
  }
  getPosts(maxResults?: number): Observable<Post[]> {
    if (isDevMode()) {
      console.log('Development Mode');
      if (!maxResults) {
        maxResults = 50;
      }
      return from(this.getAllPosts()).pipe(
        map(posts => posts.slice(0, maxResults)),
        catchError(err => {
          console.error(err);
          return of([]);
        })
      );
    } else {
      console.log('Production Mode');
      const maxResultsPostfix = maxResults ? `?maxResults=${maxResults}` : '';
      return this.httpClient.get<PostResponse>(`.netlify/functions/list-posts${maxResultsPostfix}`).pipe(
        map(response => response.items ?? []),
        catchError(err => {
            console.error(err);
            return of([]);
          }
        ));
    }
  }
}
