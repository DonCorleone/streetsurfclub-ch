import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Page} from "../../models/pages";
import {SafeHtmlPipe} from "../../pipes/safe-html-pipe";
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ancal-footer',
  templateUrl: './ancal-footer.component.html',
  imports: [
    SafeHtmlPipe,
    NgIf,
    RouterLink,
    AsyncPipe
  ],
  standalone: true,
})
export class AncalFooterComponent{
  @Input() contact: Page | undefined;

}
