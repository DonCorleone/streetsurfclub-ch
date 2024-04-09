import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import {DarkmodeService} from "../../services/darkmode.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
  imports: [RouterLink, AsyncPipe]
})
export class FooterComponent {
  isDarkMode$ = this.darkmodeService.isDarkMode$;

  constructor(private darkmodeService: DarkmodeService) {}
}
