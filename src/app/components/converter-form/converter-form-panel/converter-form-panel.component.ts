import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CurrenciesService } from '../../../services/currencies.service';
import { CurrencyCustomPipe } from '../../../pipes/currencyCustom.pipe';

@Component({
  selector: 'app-converter-form-panel',
  standalone: true,
  imports: [CurrencyCustomPipe],
  template: `
    <form>
      <h3>{{ headerText }}</h3>
      <div>
        <label [for]="idPrefix + 'Currency'">Amount</label>
        <select
          [name]="idPrefix + 'Currency'"
          [id]="idPrefix + 'Currency'"
          (change)="onChangeCurrency()"
          #currencySelected
        >
          @for (code of codeArray; track code) {
          <option [value]="code" [selected]="selectedCode === code">
            {{ code }}
          </option>
          }
        </select>
      </div>
      <div>
        <input
          type="number"
          [id]="idPrefix + 'Amount'"
          [name]="idPrefix + 'Amount'"
          [value]="selectedAmount | currencyCustom"
          (keyup)="onChangeAmount()"
          [disabled]="!isAmountMutable"
          #amountSelected
        />
      </div>
    </form>
  `,
  styles: `
    form {
      border: solid red 3px;
    }
  `,
})
export class ConverterFormPanelComponent implements OnInit {
  // The binding part could have been done with reactive form but okay
  @Input() headerText = 'Amount';
  @Input() idPrefix = '';
  @Input() selectedCode = '';
  @Input() selectedAmount = 0;
  @Input() isAmountMutable = true;
  codeArray: string[] = [];
  @Output() currencyChanged = new EventEmitter<string>();
  @Output() amountChanged = new EventEmitter<number>();
  @ViewChild('currencySelected') currencySelected!: ElementRef;
  @ViewChild('amountSelected') amountSelected!: ElementRef;

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.codeArray = this.currenciesService.getCodeList();
  }

  onChangeCurrency() {
    this.currencyChanged.emit(
      (this.currencySelected.nativeElement as HTMLSelectElement).value
    );
  }

  onChangeAmount() {
    if (!this.isAmountMutable) return;
    this.amountChanged.emit(
      +(this.amountSelected.nativeElement as HTMLInputElement).value
    );
  }
}
