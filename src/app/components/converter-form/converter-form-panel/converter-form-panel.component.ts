import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { CurrencySelectorComponent } from '../../_common-ui/currency-selector/currency-selector.component';
import { ConverterService } from '../../../services/converter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-converter-form-panel',
  standalone: true,
  imports: [CurrencySelectorComponent],
  template: `
    <form>
      <h3
        class="text-sm sm:text-base md:text-xl font-medium mb-3 text-ACCENT md:mb-6"
      >
        {{ headerText }}
      </h3>
      <div class="flex [&>div]:flex-grow [&>div]:w-1 gap-4">
        <app-currency-selector
          [isBase]="isBase"
          [selectedCode]="selectedCode"
          (currencyChanged)="onCurrencyChanged($event)"
        />
        <div class="flex items-center justify-end">
          <input
            type="number"
            [id]="idPrefix + 'Amount'"
            [name]="idPrefix + 'Amount'"
            [value]="selectedAmount"
            (keyup)="onChangeAmount()"
            [disabled]="!isAmountMutable"
            #amountSelected
            class="text-right w-[80%] max-w-72 px-2 form-input-element md:text-xl"
          />
        </div>
      </div>
    </form>
  `,
})
export class ConverterFormPanelComponent implements OnInit, OnDestroy {
  private readonly MAX_AMOUNT = Number.MAX_SAFE_INTEGER / 100_000;
  @Input() isBase = true;
  selectedAmount = 0;
  @ViewChild('amountSelected') amountSelected!: ElementRef;
  selectedCode = 'MYR';
  headerText: 'Amount' | 'Converted Amount' = 'Amount';
  idPrefix: 'base' | 'target' = 'base';
  isAmountMutable = true;
  private converterSub!: Subscription;

  constructor(private converterService: ConverterService) {}

  ngOnInit(): void {
    if (this.isBase) {
      this.selectedAmount = this.converterService.getBaseAmount(); // Amount kept as single source of truth in converter service
      this.selectedCode = this.converterService.getBaseCurrency(); // Selected currency kept as single source of truth in converter service
      this.headerText = 'Amount';
      this.idPrefix = 'base';
      this.converterSub = this.converterService
        .getConverterSubject()
        .subscribe(({ baseCurrency, baseAmount }) => {
          this.selectedCode = baseCurrency;
          this.selectedAmount = baseAmount;
        });
    } else {
      this.selectedAmount = this.converterService.getConvertedAmount();
      this.selectedCode = this.converterService.getTargetCurrency();
      this.headerText = 'Converted Amount';
      this.idPrefix = 'target';
      this.converterSub = this.converterService
        .getConverterSubject()
        .subscribe(({ targetCurrency, convertedAmount }) => {
          this.selectedCode = targetCurrency;
          this.selectedAmount = convertedAmount;
        });
    }
    this.isAmountMutable = this.isBase;
  }

  ngOnDestroy(): void {
    this.converterSub.unsubscribe();
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
    this.converterService.setBaseAmount(amountNew);
  }

  onCurrencyChanged(codeNew: string) {
    if (this.isBase) this.converterService.setBaseCurrency(codeNew);
    else this.converterService.setTargetCurrency(codeNew);
  }
}
