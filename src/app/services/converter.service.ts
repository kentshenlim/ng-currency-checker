import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import debounce from '../utils/debounce';
import { ConverterEmit } from '../interfaces/converter-emit';
import constants from '../constants';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  private readonly API_KEY = constants.API_KEY_FREECURRENCY;
  private readonly DEBOUNCE_TIME_MS = 250;

  private baseCurrency = 'MYR';
  private targetCurrency = 'MYR';
  private conversionRate = 1;
  private baseAmount = 0;
  private converterSubject = new Subject<ConverterEmit>();
  private updateConversionRateAndEmitDataDebounced = debounce(
    this.updateConversionRateAndEmitData.bind(this),
    this.DEBOUNCE_TIME_MS
  );

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    const dataInit = this.localStorageService.getConverterData();
    if (!dataInit) return;
    this.baseCurrency = dataInit.baseCurrency;
    this.targetCurrency = dataInit.targetCurrency;
    this.baseAmount = dataInit.baseAmount;
    this.conversionRate = dataInit.conversionRate;
  }

  getBaseCurrency() {
    return this.baseCurrency;
  }

  setBaseCurrency(newCurrency: string) {
    this.baseCurrency = newCurrency;
    this.updateConversionRateAndEmitDataDebounced();
  }

  getTargetCurrency() {
    return this.targetCurrency;
  }

  setTargetCurrency(newCurrency: string) {
    this.targetCurrency = newCurrency;
    this.updateConversionRateAndEmitDataDebounced();
  }

  getBaseAmount() {
    return this.baseAmount;
  }

  setBaseAmount(newAmount: number) {
    this.baseAmount = newAmount;
    this.emitCurrentData(); // No need update conversion rate
  }

  getConversionRate() {
    return this.conversionRate;
  }

  swapCurrencyAndAmount() {
    [this.baseCurrency, this.targetCurrency] = [
      this.targetCurrency,
      this.baseCurrency,
    ];
    this.baseAmount = this.getConvertedAmount();
    this.conversionRate = 1 / this.conversionRate;
    this.emitCurrentData(); // No need update conversion rate
  }

  getConvertedAmount() {
    return Math.round(this.conversionRate * this.baseAmount * 100) / 100;
  }

  getConverterSubject() {
    return this.converterSubject;
  }

  private updateConversionRateAndEmitData() {
    // Don't call this directly, call debounced version
    console.log('expensive');
    const baseUrl = 'https://api.freecurrencyapi.com/v1/latest';
    let httpParams = new HttpParams();
    httpParams = httpParams.append('apikey', this.API_KEY);
    httpParams = httpParams.append('base_currency', this.baseCurrency);
    httpParams = httpParams.append('currencies', this.targetCurrency);
    this.httpClient
      .get<{ data: { [p: string]: number } }>(baseUrl, {
        params: httpParams,
      })
      .subscribe((val) => {
        this.conversionRate = val.data[this.targetCurrency];
        this.emitCurrentData();
      });
  }

  private emitCurrentData() {
    this.converterSubject.next({
      baseCurrency: this.baseCurrency,
      targetCurrency: this.targetCurrency,
      conversionRate: this.conversionRate,
      baseAmount: this.baseAmount,
      convertedAmount: this.getConvertedAmount(),
    });
    this.saveDataToLocalStorage(); // Always happen with emission
  }

  private saveDataToLocalStorage() {
    this.localStorageService.setConverterData({
      baseCurrency: this.baseCurrency,
      targetCurrency: this.targetCurrency,
      baseAmount: this.baseAmount,
      conversionRate: this.conversionRate,
      convertedAmount: this.getConvertedAmount(),
    });
  }
}
