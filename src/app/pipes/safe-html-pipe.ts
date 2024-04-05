import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(protected sanitized: DomSanitizer) {}

  transform(value: string): SafeHtml {

    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
