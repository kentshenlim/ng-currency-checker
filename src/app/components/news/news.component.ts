import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Subscription } from 'rxjs';
import { News } from '../../interfaces/news';
import { PalletComponent } from './pallet/pallet.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [PalletComponent],
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
    <div class="canva">
      <button
        type="button"
        (click)="onClickFetch()"
        class="rounded-lg bg-neutral-200 p-2 mx-auto block"
      >
        Load More
      </button>
    </div>
  `,
})
export class NewsComponent implements OnInit, OnDestroy {
  countryCode = 'my';
  newsArr: News[] = [];
  private newsSub!: Subscription;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.countryCode = this.newsService.getCountryCode();
    this.newsArr = this.newsService.getNewsCollected();
    this.newsSub = this.newsService.getNewsSubject().subscribe((data) => {
      this.countryCode = data.countryCode;
      this.newsArr = data.news;
    });
  }

  ngOnDestroy(): void {
    this.newsSub.unsubscribe();
  }

  onClickFetch() {
    this.newsService.fetchNewsPage();
  }
}
