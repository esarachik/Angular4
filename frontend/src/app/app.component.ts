import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <mat-toolbar>
    PSSocial
    <span style ="flex: 1 1 auto"></span>
    <button mat-button routerLink="/register">register</button>
  </mat-toolbar>
  <router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'my app';
}
