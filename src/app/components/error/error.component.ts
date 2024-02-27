import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  template: `
    <div class="h-[70%] flex items-center justify-center">
      <div class="flex flex-col items-center">
        <div
          class="w-[70%] h-32 bg-center bg-no-repeat bg-contain opacity-80"
          style="background-image: url('assets/images/broken-coin.png');"
        ></div>
        <h1 class="italic md:text-lg mb-4 md:mb-8 text-center">
          Oops, the page you requested was not found...
        </h1>
      </div>
    </div>
  `,
})
export class ErrorComponent {}
