import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ConverterFormComponent } from './components/converter-form/converter-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ConverterFormComponent],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <app-converter-form />

    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-currency-checker';
}
