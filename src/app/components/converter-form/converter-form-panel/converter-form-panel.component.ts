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

@Component({
  selector: 'app-converter-form-panel',
  standalone: true,
  imports: [],
  template: `
    <form>
      <h3 class="text-sm font-medium mb-3">{{ headerText }}</h3>
      <div class="flex [&>div]:flex-grow [&>div]:w-1 gap-4">
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
        <div class="flex items-center justify-end">
          <input
            type="number"
            [id]="idPrefix + 'Amount'"
            [name]="idPrefix + 'Amount'"
            [value]="selectedAmount"
            (keyup)="onChangeAmount()"
            [disabled]="!isAmountMutable"
            #amountSelected
            class="text-right w-[80%] px-2 form-input-element"
          />
        </div>
      </div>
    </form>
  `,
})
export class ConverterFormPanelComponent implements OnInit {
  private readonly MAX_AMOUNT = Number.MAX_SAFE_INTEGER / 100_000;

  // The binding part could have been done with reactive form but okay
  @Input() headerText = 'Amount';
  @Input() idPrefix = '';
  @Input() selectedCode = 'MYR';
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
    const amountInput = this.amountSelected.nativeElement as HTMLInputElement;
    let amountNew = +amountInput.value;
    if (amountNew >= this.MAX_AMOUNT) {
      amountNew = Math.floor(amountNew / 10);
      amountInput.value = String(amountNew);
      alert('Maximum amount exceeded!');
    }
    this.amountChanged.emit(amountNew);
  }

  public getFlagUrl() {
    const flagCode = this.currenciesService.getFlagCodeFromCode(
      this.selectedCode
    );
    return `https://flagsapi.com/${flagCode}/flat/64.png`;
  }
}
