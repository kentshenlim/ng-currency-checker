import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <h1 class="font-bold text-2xl mb-2 text-center text-ACCENT">
      Currency Converter
    </h1>
    <p class="text-center text-sm">
      Check live rates, trends and financial news. Powered by Angular v17.
    </p>
  `,
})
export class HeaderComponent {}
