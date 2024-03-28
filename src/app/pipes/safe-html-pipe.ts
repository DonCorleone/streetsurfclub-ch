import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}

  transform(value: string): SafeHtml {
    value = this.addClass(
      value,
      '<h1',
      /<h1.*?>/g,
      'text-slate-900 dark:text-slate-200 font-bold text-[28px] md:text-[38px] lg:text-[50px] 2xl:text-[56px]'
    );
    value = this.addClass(
      value,
      '<h2',
      /<h2.*?>/g,
      'font-bold text-slate-900 dark:text-slate-200 text-[24px] md:text-[30px] lg:text-[34px] leading-[1.3] mb-[12px] md:mb-[12px] lg:mb-[15px] xl:mb-[20px]'
    );
    value = this.addClass(
      value,
      '<h3',
      /<h3.*?>/g,
      'text-slate-900 dark:text-slate-200 font-bold text-[18px] md:text-[20px] lg:text-[22px] mb-[7px] leading-[1.3]'
    );
    value = this.addClass(
      value,
      '<h4',
      /<h4.*?>/g,
      'text-slate-900 dark:text-slate-200 font-bold text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px]'
    );
    value = this.addClass(
      value,
      '<h5',
      /<h5.*?>/g,
      'text-slate-900 dark:text-slate-200 font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[20px]'
    );
    value = this.addClass(
      value,
      '<h6',
      /<h6.*?>/g,
      'text-slate-900 dark:text-slate-200 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[18px]'
    );
    value = this.addClass(
      value,
      '<blockquote',
      /<blockquote.*?>/g,
      'text-slate-900 dark:text-slate-200 italic leading-[1.7]'
    );
    value = this.addClass(
      value,
      '<p',
      /<p.*?>/g,
      'text-[13px] md:text-[14px] lg:text-[15px] text-stone-500 dark:yellow-400 leading-[1.8] mb-[15px] md:mb-[20px] lg:mb-[25px] last:mb-0'
    );
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

  addClass(
    value: string,
    tag: string,
    regExp: RegExp,
    classes: string
  ): string {
    return value.replace(regExp, `${tag} class="${classes}">`);
  }
}
