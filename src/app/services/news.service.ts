import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import constants from '../constants';
import { News } from '../interfaces/news';
import { Subject } from 'rxjs';
import { NewsEmit } from '../interfaces/news-emit';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly API_KEY = constants.API_KEY_MARKETAUX;

  private countryCode = 'my';
  private pageNumber = 1;
  private newsCollected: News[] = [];
  private newsSubject = new Subject<NewsEmit>();

  constructor(private httpClient: HttpClient) {}

  getCountryCode() {
    return this.countryCode;
  }

  setCountryCode(countryCodeNew: string) {
    this.countryCode = countryCodeNew;
  }

  getNewsCollected() {
    return this.newsCollected;
  }

  getNewsSubject() {
    return this.newsSubject;
  }

  fetchNewsPage() {
    // Throttle this
    const baseUrl = 'https://api.marketaux.com/v1/news/all';
    let httpParams = new HttpParams();
    httpParams = httpParams.append('api_token', this.API_KEY);
    httpParams = httpParams.append('countries', this.countryCode);
    httpParams = httpParams.append('page', this.pageNumber);
    this.httpClient
      .get<{ data: News[] }>(baseUrl, {
        params: httpParams,
      })
      .subscribe((data) => {
        const newsArray = data.data;
        this.newsCollected.push(...newsArray);
        this.pageNumber++;
        this.emitCurrentData();
      });
  }

  emitCurrentData() {
    this.newsSubject.next({
      countryCode: this.countryCode,
      news: this.newsCollected,
    });
  }
}
