import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationBarComponent],
  template: `
    <h1>Current Converter</h1>
    <p>Check live rates, trends and financial news.</p>
    <router-outlet></router-outlet>
    <app-navigation-bar />
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {}
