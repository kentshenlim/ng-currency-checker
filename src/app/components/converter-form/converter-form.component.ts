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
    <div class="canva">
      <app-converter-form-panel [isBase]="true" />
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
      <app-converter-form-panel [isBase]="false" />
    </div>
    <div>
      <div class="text-sm mb-2">Indicative Exchange Rate</div>
      <p class="text-sm font-medium">
        1 <span> {{ getBaseCurrencyName() }}</span> =
        <span>{{ conversionRate | number : '1.0-4' }}</span
        >&nbsp;
        <span>{{ getTargetCurrencyName() }}</span>
      </p>
    </div>
  `,
})
export class ConverterFormComponent implements OnInit, OnDestroy {
  conversionRate = 1;
  private conversionSub!: Subscription;

  constructor(
    private converterService: ConverterService,
    private currenciesService: CurrenciesService
  ) {}

  ngOnInit(): void {
    this.conversionRate = this.converterService.getConversionRate();
    this.conversionSub = this.converterService
      .getEmitSubject()
      .subscribe(({ conversionRate }) => {
        this.conversionRate = conversionRate;
      });
  }

  ngOnDestroy(): void {
    this.conversionSub.unsubscribe();
  }

  onClickSwap() {
    this.converterService.swapCurrencyAndAmount();
  }

  getBaseCurrencyName() {
    return this.currenciesService.getFullNameFromCode(
      this.converterService.getBaseCurrency()
    );
  }

  getTargetCurrencyName() {
    return this.currenciesService.getFullNameFromCode(
      this.converterService.getTargetCurrency()
    );
  }
}
