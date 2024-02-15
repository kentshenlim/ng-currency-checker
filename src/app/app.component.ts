import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TestComponent],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <app-test />

    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-currency-checker';
}
