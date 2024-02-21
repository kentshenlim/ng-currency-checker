import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    NavigationBarComponent,
  ],
  template: `
    <div class="w-screen h-screen pt-4 flex flex-col border-2 BG-MAIN">
      <section class="px-3 mb-4">
        <app-header />
      </section>
      <section class="py-5 h-1 flex-grow px-3">
        <router-outlet></router-outlet>
      </section>
      <section>
        <app-navigation-bar />
      </section>
    </div>
  `,
})
export class AppComponent {}
