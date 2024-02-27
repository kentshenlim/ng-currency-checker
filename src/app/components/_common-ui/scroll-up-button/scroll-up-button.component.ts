import { Component } from '@angular/core';
import { ScrollingService } from '../../../services/scrolling.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-scroll-up-button',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<button
    (click)="onClickButton()"
    class="p-2 rounded-md bg-sky-300/60 font-semibold text-ACCENT flex items-center justify-center"
  >
    <ion-icon name="arrow-up-circle-outline" class="text-3xl"></ion-icon>
  </button>`,
})
export class ScrollUpButtonComponent {
  constructor(private scrollingService: ScrollingService) {}

  onClickButton() {
    this.scrollingService.scrollToTop();
  }
}
