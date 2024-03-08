import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {
  private isDarkModeSubject: ReplaySubject<boolean>;
  private bufferSize: number = 1;

  isDarkMode$;

  constructor() {
    this.isDarkModeSubject = new ReplaySubject<boolean>(this.bufferSize);
    this.isDarkMode$ = this.isDarkModeSubject.asObservable();

    this.isDarkModeSubject.next(window.matchMedia('(prefers-color-scheme: dark)').matches);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      this.isDarkModeSubject.next(event.matches);
    });
  }
}
