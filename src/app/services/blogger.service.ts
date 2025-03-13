import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {BehaviorSubject, Observable, catchError, map, of} from 'rxjs';
import {Page, PageResponse} from "../models/pages";
import {Post, PostResponse} from "../models/posts";
import {BlogResponse} from "../models/blog";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root',
})
export class BloggerService {
  private apiBaseUrl = environment.apiBaseUrl;

  quickLinks: Page[] = [];
  resources: Page[] = [];
  terms: Page[] = [];
  supports: Page[] = [];

  private blogSubject = new BehaviorSubject<BlogResponse>({} as BlogResponse);
  public blog$ = this.blogSubject.asObservable();

  private pagesSubject = new BehaviorSubject<Page[]>([]);
  public pages$ = this.pagesSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getPagesByMode().subscribe(pages => {

      this.quickLinks = this.getPagesByGroup(pages,'Quick Links');
      this.resources = this.getPagesByGroup(pages,'Resources');
      this.terms = this.getPagesByGroup(pages, 'Terms');
      this.supports = this.getPagesByGroup(pages,'Supports');

      this.pagesSubject.next(pages);
    });

    this.getBlog().subscribe(blog => {
      this.blogSubject.next(blog ?? {} as BlogResponse);
    });
  }

  getPagesByGroup(pages: Page[], group: string): Page[]  {

    // find pages where title contains attribute "group", the value should match the group parameter by regex
    // "title": "<div style=\"display: none;\" lead=\"\" sortorder=\"50\" group=\"Supports\"></div>Kontakt",
    return pages?.filter(page => page.title.match(new RegExp(`group="${group}"`, 'g'))) ?? [];
  }

  private getPagesByMode(): Observable<Page[]> {
    console.log('Production Mode');
    return this.httpClient.get<PageResponse>(`${this.apiBaseUrl}/list-pages`).pipe(
      map(response => response.items ? this.sortItems(response.items) : []),
      catchError(err => {
        console.error(err);
        return of([]);
      }));
  }

  private getBlog(): Observable<BlogResponse | null> {
    console.log('Production Mode');
    return this.httpClient.get<BlogResponse>(`${this.apiBaseUrl}/get-blog`);
  }

  getPage(pageid: string): Observable<Page | null> {
    console.log('Production Mode');
    return this.httpClient.get<Page>(`${this.apiBaseUrl}/get-page?pageid=${pageid}`);
  }

  getPost(postid: string): Observable<Post | null> {
    console.log('Production Mode');
    return this.httpClient.get<Post>(`${this.apiBaseUrl}/get-post?postid=${postid}`);
  }

  findPost(q: string): Observable<Post | null> {
    console.log('Production Mode');
    const encodedQ = encodeURIComponent(q);
    return this.httpClient.get<PostResponse>(`${this.apiBaseUrl}/find-post?encodedQ=${encodedQ}`).pipe(
      map(response => response.items ?  response.items[0] : null),
      catchError(err => {
        console.error(err);
        return of(null);
      }));
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
    console.log('Production Mode');

    // evaluate if running on a mobile device
    // add a query parameter declaring if running on a mobile device
    let params = new HttpParams();
    if (window.innerWidth < 768) {
      params = params.set('mobile', 'true');
    }
    if (maxResults) {
      params = params.set('maxResults', maxResults.toString());
    }

    return this.httpClient.get<PostResponse>(`${this.apiBaseUrl}/list-posts`, { params }).pipe(
      map(response => response.items ?? []),
      catchError(err => {
          console.error(err);
          return of([]);
        }
      ));
  }
}
