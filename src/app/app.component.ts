import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ToastComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-toast></app-toast>
  `,
  styles: ``,
})
export class AppComponent {}
