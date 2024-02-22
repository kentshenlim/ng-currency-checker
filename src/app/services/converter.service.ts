import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import debounce from '../utils/debounce';
import { ConverterEmit } from '../interfaces/converter-emit';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  // Do not manage baseAmount because History will not need it
  private readonly API_KEY =
    'fca_live_9h4SKo24xPAUpBi8nvPAgvZRizauAczIaR10Nb3q'; // Free API, CBA hiding
  private readonly DEBOUNCE_TIME_MS = 250;

  private baseCurrency = 'MYR';
  private targetCurrency = 'MYR';
  private conversionRate = 1;
  private baseAmount = 0;
  private currencyAndRateEmit = new Subject<ConverterEmit>();
  private baseAmountEmit = new Subject<number>();
  // Base amount should not be merged with currency and rate
  // Change in base amount does not require refetching conversion rate so do not
  // call emitConversionRate()
  // Base amount cannot be kept in component as the value will not persist on
  // component destroy (bad UX)
  private emitConversionRateDebounced = debounce(
    this.emitConversionRate.bind(this),
    this.DEBOUNCE_TIME_MS
  );

  constructor(private httpClient: HttpClient) {}

  public getBaseCurrency() {
    return this.baseCurrency;
  }

  public setBaseCurrency(newCurrency: string) {
    this.baseCurrency = newCurrency;
    this.emitConversionRateDebounced();
  }

  public getTargetCurrency() {
    return this.targetCurrency;
  }

  public setTargetCurrency(newCurrency: string) {
    this.targetCurrency = newCurrency;
    this.emitConversionRateDebounced();
  }

  public getBaseAmount() {
    return this.baseAmount;
  }

  public setBaseAmount(newAmount: number) {
    this.baseAmount = newAmount;
    this.baseAmountEmit.next(this.baseAmount);
  }

  public swapCurrencyAndAmount() {
    [this.baseCurrency, this.targetCurrency] = [
      this.targetCurrency,
      this.baseCurrency,
    ];
    this.baseAmount = this.getConvertedAmount();
    this.emitConversionRateDebounced();
  }

  public getConvertedAmount() {
    return Math.round(this.conversionRate * this.baseAmount * 100) / 100;
  }

  public getEmitSubject() {
    return this.currencyAndRateEmit;
  }

  public getBaseAmountEmitSubject() {
    return this.baseAmountEmit;
  }

  private emitConversionRate() {
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
        this.currencyAndRateEmit.next({
          baseCurrency: this.baseCurrency,
          targetCurrency: this.targetCurrency,
          conversionRate: this.conversionRate,
        });
        this.baseAmountEmit.next(this.baseAmount);
      });
  }
}
