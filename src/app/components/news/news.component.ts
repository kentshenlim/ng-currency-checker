import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Subscription } from 'rxjs';
import { News } from '../../interfaces/news';
import { PalletComponent } from './pallet/pallet.component';
import { ButtonWithLoadingComponent } from '../_common-ui/button-with-loading/button-with-loading.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [PalletComponent, ButtonWithLoadingComponent],
  template: `
    @for (news of newsArr; track news.uuid) {
    <div class="canva">
      <app-pallet [news]="news" />
    </div>
    } @empty {
    <div>
      <p>No news yet</p>
    </div>
    }
    <div class="flex justify-center">
      <app-button-with-loading
        [clickCallback]="onClickFetch.bind(this)"
        [isLoading]="isLoading"
      />
    </div>
  `,
})
export class NewsComponent implements OnInit, OnDestroy {
  countryCode = 'my';
  newsArr: News[] = [];
  private newsSub!: Subscription;
  public isLoading = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.countryCode = this.newsService.getCountryCode();
    this.newsArr = this.newsService.getNewsCollected();
    this.newsSub = this.newsService.getNewsSubject().subscribe((data) => {
      this.countryCode = data.countryCode;
      this.newsArr = data.news;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.newsSub.unsubscribe();
  }

  onClickFetch() {
    this.isLoading = true;
    this.newsService.fetchNewsPage();
  }
}
