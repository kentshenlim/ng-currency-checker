import { Component, OnInit } from '@angular/core';
import { ConverterService } from '../../services/converter.service';
import { CurrenciesService } from '../../services/currencies.service';
import { ConverterFormPanelComponent } from './converter-form-panel/converter-form-panel.component';
import debounce from '../../utils/debounce';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-converter-form',
  standalone: true,
  imports: [ConverterFormPanelComponent, DecimalPipe],
  template: `
    <div class="bg-gray-50 rounded-lg px-3 py-2 BG-APP mb-6">
      <app-converter-form-panel
        headerText="Amount"
        idPrefix="base"
        [selectedCode]="getBaseCurrency()"
        [selectedAmount]="getBaseAmount()"
        (currencyChanged)="onBaseCurrencyChanged($event)"
        (amountChanged)="onBaseAmountChanged($event)"
      />
      <div class="w-full mx-auto relative my-6 BORDER-MAIN">
        <button
          (click)="onClickSwap()"
          class="bg-green-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          Swap
        </button>
      </div>
      <app-converter-form-panel
        headerText="Converted Amount"
        idPrefix="target"
        [selectedCode]="getTargetCurrency()"
        [selectedAmount]="getConvertedAmount()"
        [isAmountMutable]="false"
        (currencyChanged)="onTargetCurrencyChanged($event)"
      />
    </div>
    <div>
      <div class="text-sm mb-2">Indicative Exchange Rate</div>
      <p class="text-sm font-medium">
        1 <span> {{ getBaseCurrencyName() }}</span> =
        <span>{{ getConversionRate() | number : '1.0-4' }}</span
        >&nbsp;
        <span>{{ getTargetCurrencyName() }}</span>
      </p>
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

  constructor(
    private converterService: ConverterService,
    private currenciesService: CurrenciesService
  ) {}

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
    this.baseAmount = newAmount;
  }

  onClickSwap() {
    [this.baseCurrency, this.targetCurrency] = [
      this.targetCurrency,
      this.baseCurrency,
    ];
    this.baseAmount = this.getConvertedAmount();
    this.updateConversionRateDebounced();
  }

  private updateConversionRate() {
    console.log('expensive');
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

  public getBaseCurrencyName() {
    return this.currenciesService.getFullNameFromCode(this.baseCurrency);
  }

  public getTargetCurrencyName() {
    return this.currenciesService.getFullNameFromCode(this.targetCurrency);
  }
}
