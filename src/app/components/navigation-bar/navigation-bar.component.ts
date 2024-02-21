import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <nav
      class="flex justify-between [&>div]:flex-grow [&>div]:text-center text-ACCENT [&_ion-icon]:text-lg bg-sky-200 pt-2"
    >
      <div>
        <a routerLink="/">
          <ion-icon name="swap-horizontal-sharp"></ion-icon>
          <p>Convert</p>
        </a>
      </div>
      <div>
        <a routerLink="/trend">
          <ion-icon name="trending-up-sharp"></ion-icon>
          <p>Trend</p>
        </a>
      </div>
      <div>
        <a routerLink="/news">
          <ion-icon name="newspaper-sharp"></ion-icon>
          <p>News</p>
        </a>
      </div>
    </nav>
  `,
})
export class NavigationBarComponent {}
