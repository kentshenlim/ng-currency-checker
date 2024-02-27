import { Injectable } from '@angular/core';
import { ConverterEmit } from '../interfaces/converter-emit';
import { HistoryEmit } from '../interfaces/history-emit';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly CONVERTER_KEY = 'currency-master-converter';
  private readonly HISTORY_KEY = 'currency-master-history';

  getConverterData(): ConverterEmit | null {
    const res = localStorage.getItem(this.CONVERTER_KEY);
    if (!res) return null;
    return JSON.parse(res);
  }

  setConverterData(converterData: ConverterEmit) {
    const str = JSON.stringify(converterData);
    localStorage.setItem(this.CONVERTER_KEY, str);
  }

  getHistoryData(): HistoryEmit | null {
    const res = localStorage.getItem(this.HISTORY_KEY);
    if (!res) return null;
    return JSON.parse(res);
  }

  setHistoryData(historyData: HistoryEmit) {
    const str = JSON.stringify(historyData);
    localStorage.setItem(this.HISTORY_KEY, str);
  }
}
