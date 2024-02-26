import { Component, Input } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-button-with-loading',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <button
      type="button"
      (click)="clickCallback()"
      class="rounded-lg bg-sky-200 p-2 flex items-center"
      [disabled]="isLoading"
    >
      @if (!isLoading) {
      <p>{{ text }}</p>
      } @else {
      <ion-icon name="cog-sharp" class="animate-spin text-lg text-ACCENT"
        >Update</ion-icon
      >
      }
    </button>
  `,
  styles: ``,
})
export class ButtonWithLoadingComponent {
  @Input() clickCallback!: Function;
  @Input() isLoading = false;
  @Input() text = 'Update';
}
