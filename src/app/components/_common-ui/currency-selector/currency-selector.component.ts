import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CurrenciesService } from '../../../services/currencies.service';

@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [],
  template: `
    <div class="flex items-center gap-2">
      <div
        class="w-10 rounded-full aspect-square overflow-hidden overflow border bg-center"
        [style.backgroundImage]="'url(' + getFlagUrl() + ')'"
      ></div>
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
    </div>
  `,
})
export class CurrencySelectorComponent implements OnInit {
  @Input() isBase = true;
  @Input() selectedCode = 'MYR';
  @Output() currencyChanged = new EventEmitter<string>();
  @ViewChild('currencySelected') currencySelected!: ElementRef;
  codeArray: string[] = [];
  idPrefix: 'Amount' | 'Converted Amount' = 'Amount';

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.codeArray = this.currenciesService.getCodeList();
    this.idPrefix = this.isBase ? 'Amount' : 'Converted Amount';
  }

  onChangeCurrency() {
    const newCode = (this.currencySelected.nativeElement as HTMLSelectElement)
      .value;
    this.currencyChanged.emit(newCode);
  }

  getFlagUrl() {
    const flagCode = this.currenciesService.getFlagCodeFromCode(
      this.selectedCode
    );
    return `https://flagsapi.com/${flagCode}/flat/64.png`;
  }
}
