import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Subscription } from 'rxjs';
import { News } from '../../interfaces/news';
import { PalletComponent } from './pallet/pallet.component';
import { ButtonWithLoadingComponent } from '../_common-ui/button-with-loading/button-with-loading.component';
import { CountrySelectorComponent } from '../_common-ui/country-selector/country-selector.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    PalletComponent,
    ButtonWithLoadingComponent,
    CountrySelectorComponent,
  ],
  template: `
    <div class="canva">
      <app-country-selector
        [countryForNews]="proposedCountryCode"
        (countryForNewsChanged)="onCountryForNewsChanged($event)"
      />
    </div>
    <div>
      @for (news of newsArr; track news.uuid) {
      <div class="canva">
        <app-pallet [news]="news" />
      </div>
      } @empty {
      <div class="mb-4 text-center italic md:text-lg">
        <p>Oops, no news yet...</p>
      </div>
      }
    </div>
    <div class="flex justify-center">
      <app-button-with-loading
        [clickCallback]="onClickFetch.bind(this)"
        [isLoading]="isLoading"
        [text]="getButtonText()"
      />
    </div>
  `,
})
export class NewsComponent implements OnInit, OnDestroy {
  countryCode = 'my';
  proposedCountryCode = 'my';
  newsArr: News[] = [];
  private newsSub!: Subscription;
  public isLoading = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.countryCode = this.newsService.getCountryCode();
    this.proposedCountryCode = this.newsService.getProposedCountryCode();
    this.newsArr = this.newsService.getNewsCollected();
    this.newsSub = this.newsService.getNewsSubject().subscribe((data) => {
      this.countryCode = data.countryCode;
      this.proposedCountryCode = data.proposedCountryCode;
      this.newsArr = data.news;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.newsSub.unsubscribe();
  }

  onClickFetch() {
    this.isLoading = true;
    this.newsService.fetchNewsPageThrottled();
  }

  onCountryForNewsChanged(codeNew: string) {
    this.newsService.setProposedCountryCode(codeNew);
  }

  getButtonText() {
    const pageNumber = this.newsService.getPageNumber();
    if (pageNumber === 1) return 'Get latest news';
    return 'Load more';
  }
}
