import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  template: `
    <div class="h-full flex flex-col items-center">
      <h1 class="italic">Oops, the page you requested was not found...</h1>
      <div
        class="w-[70%] h-32 bg-center bg-no-repeat bg-contain opacity-80"
        style="background-image: url('assets/images/broken-coin.png');"
      ></div>
    </div>
  `,
})
export class ErrorComponent {}
