import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { CurrencySelectorComponent } from '../../_common-ui/currency-selector/currency-selector.component';
import { CurrenciesService } from '../../../services/currencies.service';
import { ConverterService } from '../../../services/converter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-converter-form-panel',
  standalone: true,
  imports: [CurrencySelectorComponent],
  template: `
    <form>
      <h3 class="text-sm font-medium mb-3 text-ACCENT">{{ headerText }}</h3>
      <div class="flex [&>div]:flex-grow [&>div]:w-1 gap-4">
        <div class="flex items-center gap-2">
          <div
            class="w-10 rounded-full aspect-square overflow-hidden overflow border bg-center"
            [style.backgroundImage]="'url(' + getFlagUrl() + ')'"
          ></div>
          <app-currency-selector [isBase]="isBase" />
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
export class ConverterFormPanelComponent implements OnInit, OnDestroy {
  private readonly MAX_AMOUNT = Number.MAX_SAFE_INTEGER / 100_000;

  // The binding part could have been done with reactive form but okay
  @Input() isBase = true;
  public selectedAmount = 0;
  public headerText: 'Amount' | 'Converted Amount' = 'Amount';
  public idPrefix: 'base' | 'target' = 'base';
  public isAmountMutable: boolean = true;
  public selectedCode: string = 'MYR';
  private currencySub!: Subscription;
  private amountSub!: Subscription;
  @ViewChild('amountSelected') amountSelected!: ElementRef;

  constructor(
    // Does not depend on inputs, can load directly
    private converterService: ConverterService,
    private currenciesService: CurrenciesService
  ) {}

  ngOnInit(): void {
    // Depends on inputs
    if (this.isBase) {
      this.selectedAmount = this.converterService.getBaseAmount();
      this.headerText = 'Amount';
      this.idPrefix = 'base';
      this.selectedCode = this.converterService.getBaseCurrency();
      this.currencySub = this.converterService
        .getEmitSubject()
        .subscribe(({ baseCurrency }) => {
          this.selectedCode = baseCurrency;
        });
      this.amountSub = this.converterService
        .getBaseAmountEmitSubject()
        .subscribe((baseAmountNew) => {
          this.selectedAmount = baseAmountNew;
        });
    } else {
      this.selectedAmount = this.converterService.getConvertedAmount();
      this.headerText = 'Converted Amount';
      this.idPrefix = 'target';
      this.selectedCode = this.converterService.getTargetCurrency();
      this.currencySub = this.converterService
        .getEmitSubject()
        .subscribe(({ targetCurrency }) => {
          this.selectedCode = targetCurrency;
        });
      this.amountSub = this.converterService
        .getBaseAmountEmitSubject()
        .subscribe(() => {
          this.selectedAmount = this.converterService.getConvertedAmount();
        });
    }
    this.isAmountMutable = this.isBase;
  }

  ngOnDestroy(): void {
    this.currencySub.unsubscribe();
    this.amountSub.unsubscribe();
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

  public getFlagUrl() {
    const flagCode = this.currenciesService.getFlagCodeFromCode(
      this.selectedCode
    );
    return `https://flagsapi.com/${flagCode}/flat/64.png`;
  }
}
