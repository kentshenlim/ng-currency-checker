import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <h1 class="font-bold text-2xl mb-2 text-center text-ACCENT md:text-4xl">
      {{ titleText }}
    </h1>
    <p class="text-center text-sm sm:text-lg md:text-xl">
      {{ description }}
    </p>
  `,
})
export class HeaderComponent {
  titleText = 'Currency Master';
  description =
    'Check live rates, trends and financial news. Powered by Angular v17.';
}
