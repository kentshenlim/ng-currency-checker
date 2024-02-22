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
  private currencyAndRateEmit = new Subject<ConverterEmit>();
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

  public getEmitSubject() {
    return this.currencyAndRateEmit;
  }

  public swapCurrency() {
    [this.baseCurrency, this.targetCurrency] = [
      this.targetCurrency,
      this.baseCurrency,
    ];
    this.emitConversionRateDebounced();
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
        this.currencyAndRateEmit.next({
          baseCurrency: this.baseCurrency,
          targetCurrency: this.targetCurrency,
          conversionRate: val.data[this.targetCurrency],
        });
      });
  }
}
