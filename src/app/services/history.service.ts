import { Injectable } from '@angular/core';
import constants from '../constants';
import { HistoryPoint } from '../interfaces/history-point';
import debounce from '../utils/debounce';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private readonly API_KEY = constants.API_KEY;
  private readonly DEBOUNCE_TIME_MS = 500;

  private baseCurrency = 'MYR';
  private targetCurrency = 'MYR';
  private historyPoints: HistoryPoint[] = [];

  constructor(private httpClient: HttpClient) {}

  private emitHistoryPoints() {
    // Don't call this directly
    console.log('Very expensive');
    const baseUrl = 'https://api.freecurrencyapi.com/v1/historical';
    let httpParams = new HttpParams();
    httpParams = httpParams.append('apiKey', this.API_KEY);
    httpParams.append('base_currency', this.baseCurrency);
    httpParams.append('currencies', this.targetCurrency);
  }

  private dateObjToGoodString(d: Date) {
    const year = d.getFullYear().toString();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
