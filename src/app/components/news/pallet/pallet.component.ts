import { Component, Input } from '@angular/core';
import { News } from '../../../interfaces/news';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';

@Component({
  selector: 'app-pallet',
  standalone: true,
  imports: [TimeAgoPipe],
  template: `
    <div class="flex flex-col">
      <a
        [href]="'https://' + news.source"
        target="_blank"
        class="text-sm text-blue-400 mb-2 block"
        >{{ news.source }}</a
      >
      <h2 class="font-semibold text-2xl mb-3">
        <a [href]="news.url" target="_blank" class="hover:underline">{{
          news.title
        }}</a>
      </h2>
      @if (news.imageUrl && news.imageUrl.length) {
      <img
        [src]="news.imageUrl"
        alt="Image for news pallet"
        class="mb-5 w-full"
      />
      }
      <h3 class="line-clamp-[8]">{{ news.description }}</h3>
      <div class="flex justify-between mt-5">
        <p class="text-sm text-gray-700">{{ news.publishDate | timeAgo }}</p>
        <a
          [href]="news.url"
          target="_blank"
          class="text-blue-400 underline inline-block self-end"
          >Read More &gt;</a
        >
      </div>
    </div>
  `,
})
export class PalletComponent {
  @Input() news!: News;
}
