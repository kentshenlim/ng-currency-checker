import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private codeToNameMap: Record<string, string> = {
    EUR: 'Euro',
    USD: 'US Dollar',
    JPY: 'Japanese Yen',
    BGN: 'Bulgarian Lev',
    CZK: 'Czech Republic Koruna',
    DKK: 'Danish Krone',
    GBP: 'British Pound Sterling',
    HUF: 'Hungarian Forint',
    PLN: 'Polish Zloty',
    RON: 'Romanian Leu',
    SEK: 'Swedish Krona',
    CHF: 'Swiss Franc',
    ISK: 'Icelandic Króna',
    NOK: 'Norwegian Krone',
    HRK: 'Croatian Kuna',
    RUB: 'Russian Ruble',
    TRY: 'Turkish Lira',
    AUD: 'Australian Dollar',
    BRL: 'Brazilian Real',
    CAD: 'Canadian Dollar',
    CNY: 'Chinese Yuan',
    HKD: 'Hong Kong Dollar',
    IDR: 'Indonesian Rupiah',
    ILS: 'Israeli New Sheqel',
    INR: 'Indian Rupee',
    KRW: 'South Korean Won',
    MXN: 'Mexican Peso',
    MYR: 'Malaysian Ringgit',
    NZD: 'New Zealand Dollar',
    PHP: 'Philippine Peso',
    SGD: 'Singapore Dollar',
    THB: 'Thai Baht',
    ZAR: 'South African Rand',
  };

  private codeToFlagCode: Record<string, string> = {
    EUR: 'DE',
    USD: 'US',
    JPY: 'JP',
    BGN: 'BG',
    CZK: 'CZ',
    DKK: 'DK',
    GBP: 'GB',
    HUF: 'HU',
    PLN: 'PL',
    RON: 'RO',
    SEK: 'SE',
    CHF: 'CH',
    ISK: 'IS',
    NOK: 'NO',
    HRK: 'HR',
    RUB: 'RU',
    TRY: 'TR',
    AUD: 'AU',
    BRL: 'BR',
    CAD: 'CA',
    CNY: 'CN',
    HKD: 'HK',
    IDR: 'ID',
    ILS: 'IL',
    INR: 'IN',
    KRW: 'KR',
    MXN: 'MX',
    MYR: 'MY',
    NZD: 'NZ',
    PHP: 'PH',
    SGD: 'SG',
    THB: 'TH',
    ZAR: 'ZA',
  };

  getFullNameFromCode(name: string): string {
    return this.codeToNameMap[name];
  }

  getFlagCodeFromCode(code: string): string {
    return this.codeToFlagCode[code];
  }

  getCodeList() {
    return Object.keys(this.codeToNameMap).sort(); // Alphabetically
  }
}
