import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-converter-form-panel',
  standalone: true,
  imports: [],
  template: `
    <form>
      <h3>{{ headerText }}</h3>
      <div>
        <label [for]="idPrefix + 'Currency'">Amount</label>
        <input
          type="text"
          [id]="idPrefix + 'Currency'"
          [name]="idPrefix + 'Currency'"
        />
      </div>
      <div>
        <input
          type="number"
          [id]="idPrefix + 'Amount'"
          [name]="idPrefix + 'Amount'"
        />
      </div>
    </form>
  `,
  styles: `
    form {
      border: solid red 3px;
    }
  `,
})
export class ConverterFormPanelComponent {
  @Input() headerText = 'Amount';
  @Input() idPrefix = '';
}
