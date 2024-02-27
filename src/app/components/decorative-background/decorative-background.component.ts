import { Component } from '@angular/core';

@Component({
  selector: 'app-decorative-background',
  standalone: true,
  imports: [],
  template: `
    <div
      class="absolute w-screen h-screen pointer-events-none inset-0 -z-10 hidden lg:block overflow-hidden"
    >
      <div class="w-72 opacity-50 absolute h-44 xl:h-64">
        <img
          src="assets/images/coin1.png"
          alt="Decorative coin"
          class="h-full ml-auto -translate-x-32 -translate-y-10"
        />
      </div>
      <div class="w-72 opacity-50 absolute bottom-0 h-44 xl:h-64">
        <img
          src="assets/images/coin4.png"
          alt="Decorative coin"
          class="h-full ml-auto -translate-x-48 translate-y-10"
        />
      </div>
      <div class="w-72 opacity-50 right-0 absolute bottom-5 h-44 xl:h-64">
        <img
          src="assets/images/coin2.png"
          alt="Decorative coin"
          class="h-full ml-auto translate-x-16"
        />
      </div>
      <div class="w-72 opacity-50 absolute top-5 right-5 h-44 xl:h-64">
        <img
          src="assets/images/coin3.png"
          alt="Decorative coin"
          class="h-full ml-auto -translate-y-32"
        />
      </div>
    </div>
  `,
})
export class DecorativeBackgroundComponent {}
