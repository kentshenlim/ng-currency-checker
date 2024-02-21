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
      class="flex justify-between [&>a]:flex-grow [&>a]:text-center text-ACCENT [&_ion-icon]:text-lg bg-sky-200 pt-2 [&>a]:navbar-centering"
    >
      <a routerLink="/">
        <ion-icon name="swap-horizontal-sharp"></ion-icon>
        <p>Convert</p>
      </a>
      <a routerLink="/trend">
        <ion-icon name="trending-up-sharp"></ion-icon>
        <p>Trend</p>
      </a>
      <a routerLink="/news">
        <ion-icon name="newspaper-sharp"></ion-icon>
        <p>News</p>
      </a>
    </nav>
  `,
})
export class NavigationBarComponent {}
