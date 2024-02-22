import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <nav
      class="flex justify-between [&>a]:flex-grow [&>a]:text-center text-ACCENT [&_ion-icon]:text-lg bg-sky-200 [&>a]:navbar-centering [&>a]:pt-2"
    >
      <a
        routerLink="/"
        routerLinkActive="nav-active-tab"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        <ion-icon name="swap-horizontal-sharp"></ion-icon>
        <p>Convert</p>
      </a>
      <a
        routerLink="/trend"
        routerLinkActive="nav-active-tab"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        <ion-icon name="trending-up-sharp"></ion-icon>
        <p>Trend</p>
      </a>
      <a
        routerLink="/news"
        routerLinkActive="nav-active-tab"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        <ion-icon name="newspaper-sharp"></ion-icon>
        <p>News</p>
      </a>
    </nav>
  `,
})
export class NavigationBarComponent {
  private activeStr: 'Convert' | 'Trend' | 'News' = 'Convert';
}
