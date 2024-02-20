import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="flex justify-between [&>div]:flex-grow [&>div]:text-center">
      <div>
        <a routerLink="/">Converter</a>
      </div>
      <div>
        <a routerLink="/trend">Trend</a>
      </div>
      <div>
        <a routerLink="/news">News</a>
      </div>
    </nav>
  `,
})
export class NavigationBarComponent {}
