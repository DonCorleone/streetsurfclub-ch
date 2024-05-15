import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Page} from "../../models/pages";
import {SafeHtmlPipe} from "../../pipes/safe-html-pipe";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-ancal-footer',
  templateUrl: './ancal-footer.component.html',
  imports: [
    SafeHtmlPipe,
    NgIf,
    RouterLink,
    AsyncPipe,
    NgForOf
  ],
  standalone: true,
})
export class AncalFooterComponent{
  @Input() quickLinks: Page[] | undefined = [];
  @Input() resources: Page[] | undefined = [];
  @Input() terms: Page[] | undefined = [];
  @Input() supports: Page[] | undefined = [];

}
