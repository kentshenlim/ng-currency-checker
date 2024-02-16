import { Component } from '@angular/core';
import { ConverterService } from '../../services/converter.service';
import { ConverterFormPanelComponent } from './converter-form-panel/converter-form-panel.component';

@Component({
  selector: 'app-converter-form',
  standalone: true,
  imports: [ConverterFormPanelComponent],
  template: `
    <div>
      <app-converter-form-panel
        headerText="Amount"
        idPrefix="base"
        selectedCode="JPY"
        (currencyChanged)="onBaseCurrencyChanged($event)"
      />
      <app-converter-form-panel
        headerText="Converted Amount"
        idPrefix="target"
        selectedCode="GBP"
        (currencyChanged)="onTargetCurrencyChanged($event)"
      />
    </div>
  `,
  styles: ``,
})
export class ConverterFormComponent {
  private baseCurrency = '';
  private targetCurrency = '';

  constructor(private converterService: ConverterService) {}

  public onBaseCurrencyChanged(newCurrency: string) {
    this.baseCurrency = newCurrency;
  }

  public onTargetCurrencyChanged(newCurrency: string) {
    this.targetCurrency = newCurrency;
  }
}
