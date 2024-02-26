import { Component, Input, OnInit } from '@angular/core';
import { News } from '../../../interfaces/news';

@Component({
  selector: 'app-pallet',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col">
      <a
        [href]="'https://' + news.source"
        class="text-sm text-blue-400 mb-2 block"
        >{{ news.source }}</a
      >
      <h2 class="font-semibold text-2xl mb-3">{{ news.title }}</h2>
      <img
        [src]="news.image_url"
        alt="Image for news pallet"
        class="mb-5 w-full"
      />
      <h3 class="text-lg line-clamp-[8]">{{ news.description }}</h3>
      <a [href]="news.url" class="text-blue-400 underline inline-block self-end"
        >Read More</a
      >
      <p>{{ news.publishDate }}</p>
    </div>
  `,
})
export class PalletComponent implements OnInit {
  @Input() news!: News;

  ngOnInit(): void {}
}
