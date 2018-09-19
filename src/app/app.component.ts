import { Component } from '@angular/core';
import { GuardService } from './guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-music';

  constructor(public guard: GuardService) { }

}