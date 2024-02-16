import { Component, Input, OnInit } from '@angular/core';
import { CurrenciesService } from '../../../services/currencies.service';

@Component({
  selector: 'app-converter-form-panel',
  standalone: true,
  imports: [],
  template: `
    <form>
      <h3>{{ headerText }}</h3>
      <div>
        <label [for]="idPrefix + 'Currency'">Amount</label>
        <select [name]="idPrefix + 'Currency'" [id]="idPrefix + 'Currency'">
          @for (code of codeArray; track code) {
          <option [value]="code">{{ code }}</option>
          }
        </select>
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
export class ConverterFormPanelComponent implements OnInit {
  @Input() headerText = 'Amount';
  @Input() idPrefix = '';
  codeArray: string[] = [];

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.codeArray = this.currenciesService.getCodeList();
  }
}
