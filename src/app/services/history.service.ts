import { Injectable } from '@angular/core';
import constants from '../constants';
import { HistoryPoint } from '../interfaces/history-point';
import debounce from '../utils/debounce';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HistoryDateService } from './history-date.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private readonly API_KEY = constants.API_KEY;
  private readonly DEBOUNCE_TIME_MS = 1000;

  private baseCurrency = 'MYR';
  private targetCurrency = 'MYR';
  private dateStrings: string[];
  private historyPoints: HistoryPoint[] = [];
  private completeCount = 0; // Number of history points calculated completely
  private isMonthly = true;
  private historyPointsEmit = new Subject<HistoryPoint[]>();
  public emitHistoryPointsDebounced = debounce(
    this.emitHistoryPoints.bind(this),
    this.DEBOUNCE_TIME_MS
  );

  constructor(
    private historyDateService: HistoryDateService,
    private httpClient: HttpClient
  ) {
    this.dateStrings = this.historyDateService.getDateStrings(this.isMonthly);
    this.historyPoints = [];
  }

  public getBaseCurrency() {
    return this.baseCurrency;
  }

  public setBaseCurrency(newCurrency: string) {
    this.baseCurrency = newCurrency;
  }

  public getTargetCurrency() {
    return this.targetCurrency;
  }

  public setTargetCurrency(newCurrency: string) {
    this.targetCurrency = newCurrency;
  }

  public getHistoryPointsSubject() {
    return this.historyPointsEmit;
  }

  public getIsMonthly() {
    return this.isMonthly;
  }

  public setIsMonthly(isMonthly: boolean) {
    this.isMonthly = isMonthly;
    this.dateStrings = this.historyDateService.getDateStrings(this.isMonthly);
  }

  public getHistoryPoints() {
    return this.historyPoints;
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
    console.log('Very expensive');
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
          this.historyPointsEmit.next(this.historyPoints);
      });
  }
}
