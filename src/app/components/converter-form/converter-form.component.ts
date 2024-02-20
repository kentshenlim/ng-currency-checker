import { Component, OnInit } from '@angular/core';
import { ConverterService } from '../../services/converter.service';
import { ConverterFormPanelComponent } from './converter-form-panel/converter-form-panel.component';
import debounce from '../../utils/debounce';

@Component({
  selector: 'app-converter-form',
  standalone: true,
  imports: [ConverterFormPanelComponent],
  template: `
    <div class="bg-gray-50 rounded-lg px-3 py-2 BG-APP">
      <app-converter-form-panel
        headerText="Amount"
        idPrefix="base"
        [selectedCode]="getBaseCurrency()"
        [selectedAmount]="getBaseAmount()"
        (currencyChanged)="onBaseCurrencyChanged($event)"
        (amountChanged)="onBaseAmountChanged($event)"
      />
      <button class="my-5">Swap</button>
      <app-converter-form-panel
        headerText="Converted Amount"
        idPrefix="target"
        [selectedCode]="getTargetCurrency()"
        [selectedAmount]="getConvertedAmount()"
        [isAmountMutable]="false"
        (currencyChanged)="onTargetCurrencyChanged($event)"
      />
    </div>
  `,
})
export class ConverterFormComponent implements OnInit {
  private readonly DEBOUNCE_TIME_MS = 250;

  private baseCurrency = 'MYR';
  private targetCurrency = 'MYR';
  private baseAmount = 0;
  private conversionRate = 1;
  private updateConversionRateDebounced = debounce(
    this.updateConversionRate.bind(this),
    this.DEBOUNCE_TIME_MS
  );

  constructor(private converterService: ConverterService) {}

  ngOnInit(): void {
    // Comment during development to save API
    // this.updateConversionRateDebounced();
  }

  onBaseCurrencyChanged(newCurrency: string) {
    this.baseCurrency = newCurrency;
    this.updateConversionRateDebounced();
  }

  onTargetCurrencyChanged(newCurrency: string) {
    this.targetCurrency = newCurrency;
    this.updateConversionRateDebounced();
  }

  onBaseAmountChanged(newAmount: number) {
    // Handle max amount here
    this.baseAmount = newAmount;
  }

  private updateConversionRate() {
    this.converterService
      .getConversionRate(this.baseCurrency, this.targetCurrency)
      .subscribe((obj) => {
        this.conversionRate = obj.data[this.targetCurrency];
      });
  }

  public getConvertedAmount() {
    return Math.round(this.conversionRate * this.baseAmount * 100) / 100;
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

  public getConversionRate() {
    return this.conversionRate;
  }
}
