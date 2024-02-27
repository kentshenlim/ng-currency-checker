import { Injectable } from '@angular/core';
import constants from '../constants';
import { HistoryPoint } from '../interfaces/history-point';
import debounce from '../utils/debounce';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HistoryDateService } from './history-date.service';
import { Subject } from 'rxjs';
import { HistoryEmit } from '../interfaces/history-emit';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private readonly API_KEY = constants.API_KEY_FREECURRENCY;
  private readonly DEBOUNCE_TIME_MS = 4000;

  private baseCurrency = 'GBP';
  private targetCurrency = 'GBP';
  private dateStrings: string[];
  private historyPoints: HistoryPoint[] = [];
  private completeCount = 0; // Number of history points calculated completely
  private isMonthly = true;
  private historyDataSubject = new Subject<HistoryEmit>();
  public emitHistoryPointsDebounced = debounce(
    this.emitHistoryPoints.bind(this),
    this.DEBOUNCE_TIME_MS
  );

  constructor(
    private historyDateService: HistoryDateService,
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.historyPoints = [];
    const dataInit = this.localStorageService.getHistoryData();
    if (dataInit) {
      this.baseCurrency = dataInit.baseCurrency;
      this.targetCurrency = dataInit.targetCurrency;
      this.isMonthly = dataInit.isMonthly;
      this.historyPoints = dataInit.historyPoints;
    }
    this.dateStrings = this.historyDateService.getDateStrings(this.isMonthly);
    // dateStrings might be out-of-sync with historyPoints but nvm
    // Date in historyPoints will be consistent with the values
  }

  getBaseCurrency() {
    return this.baseCurrency;
  }

  setBaseCurrency(newCurrency: string) {
    this.baseCurrency = newCurrency;
    this.emitCurrentData();
  }

  getTargetCurrency() {
    return this.targetCurrency;
  }

  setTargetCurrency(newCurrency: string) {
    this.targetCurrency = newCurrency;
    this.emitCurrentData();
  }

  getIsMonthly() {
    return this.isMonthly;
  }

  setIsMonthly(isMonthly: boolean) {
    this.isMonthly = isMonthly;
    this.dateStrings = this.historyDateService.getDateStrings(this.isMonthly);
    this.emitCurrentData();
  }

  getHistoryPoints() {
    return this.historyPoints;
  }

  getHistoryDataSubject() {
    return this.historyDataSubject;
  }

  private emitHistoryPoints() {
    // Debounce this
    this.completeCount = 0; // Reset to 0
    this.historyPoints = new Array(this.dateStrings.length);
    for (let i = 0; i < this.dateStrings.length; i++) {
      this.fetchHistoryPoint(this.dateStrings[i], i);
    }
  }

  private fetchHistoryPoint(dateString: string, idx: number) {
    // Don't call this directly
    const baseUrl = 'https://api.freecurrencyapi.com/v1/historical';
    let httpParams = new HttpParams();
    httpParams = httpParams.append('apikey', this.API_KEY);
    httpParams = httpParams.append('base_currency', this.baseCurrency);
    httpParams = httpParams.append('currencies', this.targetCurrency);
    httpParams = httpParams.append('date', dateString);
    this.httpClient
      .get<{ data: { [date: string]: { [currency: string]: number } } }>(
        baseUrl,
        {
          params: httpParams,
        }
      )
      .subscribe((res) => {
        const value = res.data[dateString][this.targetCurrency];
        const xKey = this.isMonthly
          ? this.historyDateService.dateStringToMonthString(dateString)
          : this.historyDateService.dateStringToYearString(dateString);
        this.historyPoints[idx] = { value, xKey };
        this.completeCount++;
        if (this.completeCount === this.dateStrings.length)
          // If all points ready
          this.emitCurrentData();
      });
  }

  private emitCurrentData() {
    this.historyDataSubject.next({
      baseCurrency: this.baseCurrency,
      targetCurrency: this.targetCurrency,
      isMonthly: this.isMonthly,
      historyPoints: this.historyPoints,
    });
    this.saveDataToLocalStorage();
  }

  private saveDataToLocalStorage() {
    this.localStorageService.setHistoryData({
      baseCurrency: this.baseCurrency,
      targetCurrency: this.targetCurrency,
      isMonthly: this.isMonthly,
      historyPoints: this.historyPoints,
    });
  }
}
