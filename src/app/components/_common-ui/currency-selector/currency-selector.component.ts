import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CurrenciesService } from '../../../services/currencies.service';

@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [],
  template: `
    <select
      [name]="idPrefix + 'Currency'"
      [id]="idPrefix + 'Currency'"
      (change)="onChangeCurrency()"
      #currencySelected
      class="form-input-element"
    >
      @for (code of codeArray; track code) {
      <option [value]="code" [selected]="selectedCode === code">
        {{ code }}
      </option>
      }
    </select>
  `,
  styles: ``,
})
export class CurrencySelectorComponent implements OnInit {
  @Input() idPrefix = '';
  @Input() selectedCode = 'MYR';
  codeArray: string[] = [];
  @Output() currencyChanged = new EventEmitter<string>();
  @ViewChild('currencySelected') currencySelected!: ElementRef;

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.codeArray = this.currenciesService.getCodeList();
  }

  onChangeCurrency() {
    this.currencyChanged.emit(
      (this.currencySelected.nativeElement as HTMLSelectElement).value
    );
  }
}
