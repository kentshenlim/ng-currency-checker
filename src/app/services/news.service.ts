import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import constants from '../constants';
import { News } from '../interfaces/news';
import { Subject } from 'rxjs';
import { NewsEmit } from '../interfaces/news-emit';
import throttle from '../utils/throttle';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly THROTTLE_TIME_MS = 500;
  private readonly API_KEY = constants.API_KEY_MARKETAUX;

  private countryCode = 'gb'; // Current news
  private proposedCountryCode = 'gb'; // Next round
  private pageNumber = 1;
  private newsCollected: News[] = [
    // {
    //   description:
    //     'KUALA LUMPUR: A businessman has filed a lawsuit against Badrul Hisham Shaharin, or “Chegubard”, and Taman Medan Assemblyman Dr Afif Bahardin to claim ...',
    //   imageUrl:
    //     'https://thesun.my/binrepository/480x270/0c10/480d250/none/11808/CMBA/judge-gavel-309290-20190415161029-1027304-20200318100109-3232676-20230616072723_3901544_20240223172321.jpg',
    //   publishDate: '2024-02-23T09:23:19.000000Z',
    //   source: 'thesundaily.my',
    //   title:
    //     'Businessman sues Chegubard, Taman Medan Assemblyman for defamation',
    //   url: 'https://thesun.my/local_news/businessman-sues-chegubard-taman-medan-assemblyman-for-defamation-CB12132918',
    //   uuid: '5a5c4d60-4298-41cf-b923-4830540ed1bf',
    // },
    // {
    //   description:
    //     'Shares of multi-utilities company YTL Power International rebounded on Friday from a two-day decline with the majority of analysts continuing to advocate investors to buy the stock following better-than-expected results.  YTL Power rose 3.2% to RM3.90 at 9.15am after 9.56 million shares changed hands on Bursa Malaysia. At the same time, shares of parent company YTL Corporation also rose, up 6% to RM2.28. The country’s benchmark index FTSE Bursa Malaysia KLCI was barely higher.',
    //   imageUrl:
    //     'https://assets.theedgemarkets.com/YTL-Power-International_www.ytlpowerinternational.com__12.jpg',
    //   publishDate: '2024-02-23T02:36:17.000000Z',
    //   source: 'theedgemarkets.com',
    //   title:
    //     "YTL Power rebounds after strong 2Q results, analysts still have 'buy' calls",
    //   url: 'https://theedgemalaysia.com/node/702050',
    //   uuid: 'd72d1971-6563-4866-97d6-cc86c3b7838d',
    // },
    // {
    //   description:
    //     "Shares of Notion Vtec surged as much as 43% to its highest in more than a year on the back of a spike in trading volume following the electronic manufacturing services firm’s latest results.  Notion Vtec's shares rose to RM0.45, its highest since Feb 8, 2023. The stock was last trading at RM0.435 at 3pm after more than 63.5 million shares changed hands, the largest volume in more than four years. In contrast, the benchmark index FTSE Bursa Malaysia KLCI was down 0.5%",
    //   imageUrl:
    //     'https://assets.theedgemarkets.com/Hot-Stock_theedgemalaysia_2.jpg',
    //   publishDate: '2024-02-22T07:58:33.000000Z',
    //   source: 'theedgemarkets.com',
    //   title:
    //     'Notion Vtec shares top 12-month high amid spike in trading volume',
    //   url: 'https://theedgemalaysia.com/node/701911',
    //   uuid: 'dc30d370-65c9-4cbc-ad70-56db8db7c0fd',
    // },
  ];
  private newsSubject = new Subject<NewsEmit>();
  fetchNewsPageThrottled = throttle(
    this.fetchNewsPage.bind(this),
    this.THROTTLE_TIME_MS
  );

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    const dataInit = this.localStorageService.getNewsData();
    if (dataInit) {
      this.countryCode = dataInit.countryCode;
      this.proposedCountryCode = dataInit.countryCode;
    }
  }

  getCountryCode() {
    return this.countryCode;
  }

  getProposedCountryCode() {
    return this.proposedCountryCode;
  }

  setProposedCountryCode(countryCodeNew: string) {
    this.proposedCountryCode = countryCodeNew;
    this.saveDataToLocalStorage();
  }

  getNewsCollected() {
    return this.newsCollected;
  }

  getNewsSubject() {
    return this.newsSubject;
  }

  getPageNumber() {
    return this.pageNumber;
  }

  private fetchNewsPage() {
    // Throttle this
    if (this.countryCode !== this.proposedCountryCode) {
      this.newsCollected = []; // Clear if country has changed
      this.pageNumber = 1;
    }
    const baseUrl = 'https://api.marketaux.com/v1/news/all';
    let httpParams = new HttpParams();
    httpParams = httpParams.append('api_token', this.API_KEY);
    httpParams = httpParams.append('countries', this.proposedCountryCode);
    httpParams = httpParams.append('page', this.pageNumber);
    httpParams = httpParams.append('language', 'en');
    this.httpClient
      .get<{
        data: {
          uuid: string;
          source: string;
          title: string;
          description: string;
          image_url: string;
          published_at: string;
          url: string;
        }[];
      }>(baseUrl, {
        params: httpParams,
      })
      .subscribe((data) => {
        const newsArray = data.data.map((d) => {
          return {
            uuid: d.uuid,
            source: d.source,
            title: d.title,
            description: d.description,
            imageUrl: d.image_url,
            publishDate: d.published_at,
            url: d.url,
          };
        });
        this.countryCode = this.proposedCountryCode;
        this.newsCollected.push(...newsArray);
        this.pageNumber++;
        this.emitCurrentData();
      });
  }

  emitCurrentData() {
    this.newsSubject.next({
      countryCode: this.countryCode,
      proposedCountryCode: this.proposedCountryCode,
      news: this.newsCollected,
    });
  }

  private saveDataToLocalStorage() {
    this.localStorageService.setNewsData({
      countryCode: this.proposedCountryCode,
    });
  }
}
