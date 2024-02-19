import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  private apiKey = 'fca_live_9h4SKo24xPAUpBi8nvPAgvZRizauAczIaR10Nb3q'; // Free API, CBA hiding

  constructor(private httpClient: HttpClient) {}

  public getConversionRate(baseCurrency: string, currency: string) {
    // Return observable
    const baseUrl = 'https://api.freecurrencyapi.com/v1/latest';
    let httpParams = new HttpParams();
    httpParams = httpParams.append('apikey', this.apiKey);
    httpParams = httpParams.append('base_currency', baseCurrency);
    httpParams = httpParams.append('currencies', currency);
    return this.httpClient.get<{ data: { [p: string]: number } }>(baseUrl, {
      params: httpParams,
    });
  }
}
