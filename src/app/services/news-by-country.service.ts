import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewsByCountryService {
  private countryToCodeMap: Record<string, string> = {
    Argentina: 'ar',
    Australia: 'au',
    Belgium: 'be',
    Brazil: 'br',
    Canada: 'ca',
    Switzerland: 'ch',
    Chile: 'cl',
    China: 'cn',
    'Czech Republic': 'cz',
    Germany: 'de',
    Egypt: 'eg',
    Spain: 'es',
    'European Union': 'eu',
    France: 'fr',
    'United Kingdom': 'gb',
    Global: 'global',
    Greece: 'gr',
    'Hong Kong': 'hk',
    Hungary: 'hu',
    Indonesia: 'id',
    Ireland: 'ie',
    Israel: 'il',
    India: 'in',
    Italy: 'it',
    Japan: 'jp',
    Korea: 'kr',
    'Sri Lanka': 'lk',
    Mexico: 'mx',
    Malaysia: 'my',
    Netherlands: 'nl',
    Norway: 'no',
    'New Zealand': 'nz',
    Philippines: 'ph',
    Portugal: 'pt',
    Qatar: 'qa',
    'Russian Federation': 'ru',
    'Saudi Arabia': 'sa',
    Turkey: 'tr',
    Taiwan: 'tw',
    'United States': 'us',
    Venezuela: 've',
    'South Africa': 'za',
  };

  getAllCountries() {
    return Object.keys(this.countryToCodeMap).sort();
  }

  getAllCodes() {
    const countries = this.getAllCountries();
    return countries.map((country) => this.getCodeFromCountry(country));
  }

  getCodeFromCountry(country: string) {
    return this.countryToCodeMap[country];
  }
}
