import { Component, Input, OnInit } from '@angular/core';
import { News } from '../../../interfaces/news';

@Component({
  selector: 'app-pallet',
  standalone: true,
  imports: [],
  template: `
    <div>
      <p>{{ news.source }}</p>
      <h2>{{ news.title }}</h2>
      <h3>{{ news.description }}</h3>
      <p>{{ news.publishDate }}</p>
    </div>
  `,
})
export class PalletComponent implements OnInit {
  @Input() news!: News;

  ngOnInit(): void {}
}
