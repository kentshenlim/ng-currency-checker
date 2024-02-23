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
// This component must not be dependent on any service apart from currenciesService
export class CurrencySelectorComponent implements OnInit {
  @Input() isBase = true;
  @Input() selectedCode = 'MYR';
  public idPrefix: 'Amount' | 'Converted Amount' = 'Amount';
  public codeArray: string[] = [];
  @ViewChild('currencySelected') currencySelected!: ElementRef;
  @Output() currencyChanged = new EventEmitter<string>();

  constructor(
    // Does not depend on inputs, can load directly
    private currenciesService: CurrenciesService
  ) {
    this.codeArray = this.currenciesService.getCodeList();
  }

  ngOnInit(): void {
    this.idPrefix = this.isBase ? 'Amount' : 'Converted Amount';
  }

  public onChangeCurrency() {
    const newCode = (this.currencySelected.nativeElement as HTMLSelectElement)
      .value;
    this.currencyChanged.emit(newCode);
  }

  public getFlagUrl() {
    const flagCode = this.currenciesService.getFlagCodeFromCode(
      this.selectedCode
    );
    return `https://flagsapi.com/${flagCode}/flat/64.png`;
  }
}
