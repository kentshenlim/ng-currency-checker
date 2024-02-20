import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [],
  template: `
    <nav>
      <ul>
        <li>Converter</li>
        <li>Trend</li>
        <li>News</li>
      </ul>
    </nav>
  `,
  styles: ``,
})
export class NavigationBarComponent {}
