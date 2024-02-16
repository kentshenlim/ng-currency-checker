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
        [selectedCode]="getBaseCurrency()"
        [selectedAmount]="getBaseAmount()"
        (currencyChanged)="onBaseCurrencyChanged($event)"
        (amountChanged)="onBaseAmountChanged($event)"
      />
      <app-converter-form-panel
        headerText="Converted Amount"
        idPrefix="target"
        [selectedCode]="getTargetCurrency()"
        [selectedAmount]="getTargetAmount()"
        (currencyChanged)="onTargetCurrencyChanged($event)"
        (amountChanged)="onTargetAmountChanged($event)"
      />
    </div>
  `,
  styles: ``,
})
export class ConverterFormComponent {
  private baseCurrency = 'MYR';
  private targetCurrency = 'GBP';
  private baseAmount = 1;
  private targetAmount = 100;

  constructor(private converterService: ConverterService) {}

  public onBaseCurrencyChanged(newCurrency: string) {
    this.baseCurrency = newCurrency;
  }

  public onTargetCurrencyChanged(newCurrency: string) {
    this.targetCurrency = newCurrency;
  }

  public onBaseAmountChanged(newAmount: number) {
    this.baseAmount = newAmount;
    console.log(this.baseAmount, this.targetAmount);
  }

  public onTargetAmountChanged(newAmount: number) {
    this.targetAmount = newAmount;
    console.log(this.baseAmount, this.targetAmount);
  }

  public getBaseCurrency() {
    return this.baseCurrency;
  }

  public getTargetCurrency() {
    return this.targetCurrency;
  }

  public getBaseAmount() {
    return this.baseAmount;
  }

  public getTargetAmount() {
    return this.targetAmount;
  }
}
