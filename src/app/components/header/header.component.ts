import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <h1 class="font-semibold text-2xl mb-2 text-center">Currency Converter</h1>
    <p class="text-center text-sm">
      Check live rates, trends and financial news.
    </p>
  `,
})
export class HeaderComponent {}
