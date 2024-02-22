import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { CurrenciesService } from '../../../services/currencies.service';
import { ConverterService } from '../../../services/converter.service';
import { Subscription } from 'rxjs';

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
export class CurrencySelectorComponent implements OnInit, OnDestroy {
  @Input() isBase = true;
  public idPrefix: 'Amount' | 'Converted Amount' = 'Amount';
  public selectedCode: string = 'MYR';
  public codeArray: string[] = [];
  private currencySub!: Subscription;
  @ViewChild('currencySelected') currencySelected!: ElementRef;

  constructor(
    // Does not depend on inputs, can load directly
    private currenciesService: CurrenciesService,
    private converterService: ConverterService
  ) {
    this.codeArray = this.currenciesService.getCodeList();
  }

  ngOnInit(): void {
    if (this.isBase) {
      this.idPrefix = 'Amount';
      this.selectedCode = this.converterService.getBaseCurrency();
      this.currencySub = this.converterService
        .getEmitSubject()
        .subscribe(({ baseCurrency }) => {
          this.selectedCode = baseCurrency;
        });
    } else {
      this.idPrefix = 'Converted Amount';
      this.selectedCode = this.converterService.getTargetCurrency();
      this.currencySub = this.converterService
        .getEmitSubject()
        .subscribe(({ targetCurrency }) => {
          this.selectedCode = targetCurrency;
        });
    }
  }

  ngOnDestroy(): void {
    this.currencySub.unsubscribe();
  }

  onChangeCurrency() {
    const newCode = (this.currencySelected.nativeElement as HTMLSelectElement)
      .value;
    if (this.isBase) this.converterService.setBaseCurrency(newCode);
    else this.converterService.setTargetCurrency(newCode);
  }
}
