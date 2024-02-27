import { Injectable } from '@angular/core';
import { ConverterEmit } from '../interfaces/converter-emit';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly converterKey = 'currency-master-converter';

  getConverterData(): ConverterEmit | null {
    const res = localStorage.getItem(this.converterKey);
    if (!res) return null;
    return JSON.parse(res);
  }

  setConverterData(converterData: ConverterEmit) {
    const str = JSON.stringify(converterData);
    localStorage.setItem(this.converterKey, str);
  }
}
