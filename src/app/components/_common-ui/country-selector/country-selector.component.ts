import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NewsByCountryService } from '../../../services/news-by-country.service';

@Component({
  selector: 'app-country-selector',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="flex justify-center items-center gap-2">
      <label for="country-for-news" class="md:text-xl">News</label>
      <ion-icon name="at-sharp" class="button-ion-icon"></ion-icon>
      <select
        name="country-for-news"
        id="country-for-news"
        (change)="onChangeCountryForNews()"
        #countryForNewsSelected
        class="form-input-element"
      >
        @for (country of countryArr; track country; let idx = $index) {
        <option
          [value]="codeArr[idx]"
          [selected]="countryForNews === codeArr[idx]"
        >
          {{ country }}
        </option>
        }
      </select>
    </div>
  `,
})
export class CountrySelectorComponent implements OnInit {
  @Input() countryForNews = 'my';
  @Output() countryForNewsChanged = new EventEmitter<string>();
  @ViewChild('countryForNewsSelected') countryForNewsSelectedInput!: ElementRef;
  countryArr: string[] = [];
  codeArr: string[] = [];

  constructor(private newsByCountryService: NewsByCountryService) {}

  ngOnInit(): void {
    this.countryArr = this.newsByCountryService.getAllCountries();
    this.codeArr = this.newsByCountryService.getAllCodes();
  }

  onChangeCountryForNews() {
    const el = this.countryForNewsSelectedInput
      .nativeElement as HTMLSelectElement;
    this.countryForNewsChanged.emit(el.value);
  }
}
