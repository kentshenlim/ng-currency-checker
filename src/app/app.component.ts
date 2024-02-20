import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationBarComponent],
  template: `
    <div class="w-screen h-screen pt-4 flex flex-col border-2 border-red-400">
      <section class="px-3">
        <h1 class="font-semibold text-2xl mb-2 text-center">
          Currency Converter
        </h1>
        <p class="text-center text-sm">
          Check live rates, trends and financial news.
        </p>
      </section>
      <section class="border-2 border-green-300 h-1 flex-grow px-3">
        <router-outlet></router-outlet>
      </section>
      <section class="border-2 border-red-400">
        <app-navigation-bar />
      </section>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {}
