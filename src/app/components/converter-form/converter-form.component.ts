import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConverterService } from '../../services/converter.service';
import { CurrenciesService } from '../../services/currencies.service';
import { ConverterFormPanelComponent } from './converter-form-panel/converter-form-panel.component';
import { DecimalPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-converter-form',
  standalone: true,
  imports: [ConverterFormPanelComponent, DecimalPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="rounded-lg px-3 py-2 mb-6 bg-CANVA">
      <app-converter-form-panel
        [isBase]="true"
        [selectedAmount]="getBaseAmount()"
        (amountChanged)="onBaseAmountChanged($event)"
      />
      <div class="w-full mx-auto relative my-6 border border-MAIN">
        <button
          (click)="onClickSwap()"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 aspect-square rounded-full bg-sky-200/60 flex items-center justify-center"
        >
          <ion-icon
            name="swap-vertical-outline"
            class="text-lg text-ACCENT"
          ></ion-icon>
        </button>
      </div>
      <app-converter-form-panel
        [isBase]="false"
        [selectedAmount]="getConvertedAmount()"
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
export class ConverterFormComponent implements OnInit, OnDestroy {
  private baseAmount = 0;
  private conversionRate = 1;
  private conversionSub!: Subscription;

  constructor(
    // Does not depends on input, can load directly
    private converterService: ConverterService,
    private currenciesService: CurrenciesService
  ) {}

  ngOnInit(): void {
    // Depends on input
    this.conversionSub = this.converterService
      .getEmitSubject()
      .subscribe(({ conversionRate }) => {
        this.conversionRate = conversionRate;
      });
  }

  ngOnDestroy(): void {
    this.conversionSub.unsubscribe();
  }

  onBaseAmountChanged(newAmount: number) {
    this.baseAmount = newAmount;
  }

  onClickSwap() {
    this.converterService.swapCurrency();
    this.baseAmount = this.getConvertedAmount(); // Amount not handled by converter service
  }

  public getConvertedAmount() {
    return Math.round(this.conversionRate * this.baseAmount * 100) / 100;
  }

  public getBaseAmount() {
    return this.baseAmount;
  }

  public getConversionRate() {
    return this.conversionRate;
  }

  public getBaseCurrencyName() {
    return this.currenciesService.getFullNameFromCode(
      this.converterService.getBaseCurrency()
    );
  }

  public getTargetCurrencyName() {
    return this.currenciesService.getFullNameFromCode(
      this.converterService.getTargetCurrency()
    );
  }
}
