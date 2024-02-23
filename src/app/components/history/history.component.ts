import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { HistoryService } from '../../services/history.service';
import { CurrencySelectorComponent } from '../_common-ui/currency-selector/currency-selector.component';
import { HistoryPoint } from '../../interfaces/history-point';
import { Subscription } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CurrencySelectorComponent, ChartComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="canva">
      <div class="flex justify-between items-center mb-4">
        <app-currency-selector
          [isBase]="true"
          [selectedCode]="baseCurrency"
          (currencyChanged)="onBaseCurrencyChanged($event)"
        />
        <ion-icon
          name="arrow-forward-sharp"
          class="text-xl text-ACCENT animate-bounce-lr"
        ></ion-icon>
        <app-currency-selector
          [isBase]="false"
          [selectedCode]="targetCurrency"
          (currencyChanged)="onTargetCurrencyChanged($event)"
        />
      </div>
      <div class="flex justify-around">
        <select
          name="isMonthly"
          id="isMonthly"
          class="form-input-element"
          (change)="onIsMonthlyChanged()"
          #isMonthlyInput
        >
          <option value="monthly" [selected]="isMonthly">Monthly</option>
          <option value="yearly" [selected]="!isMonthly">Yearly</option>
        </select>
        <button
          type="button"
          (click)="onClickUpdate()"
          class="rounded-lg bg-neutral-200 p-2"
        >
          Update
        </button>
      </div>
      <app-chart [inputData]="historyPoints" />
    </div>
  `,
})
export class HistoryComponent implements OnInit, OnDestroy {
  public baseCurrency = 'MYR';
  public targetCurrency = 'MYR';
  public historyPoints: HistoryPoint[] = [];
  private historyEmitSubject!: Subscription;
  public isMonthly = true;
  @ViewChild('isMonthlyInput') isMonthlyInput!: ElementRef;

  constructor(private historyService: HistoryService) {
    this.baseCurrency = this.historyService.getBaseCurrency();
    this.targetCurrency = this.historyService.getTargetCurrency();
    this.isMonthly = this.historyService.getIsMonthly();
    this.historyPoints = this.historyService.getHistoryPoints();
  }

  ngOnInit(): void {
    this.historyEmitSubject = this.historyService
      .getHistoryPointsSubject()
      .subscribe((data) => {
        this.historyPoints = data;
      });
  }

  ngOnDestroy(): void {
    this.historyEmitSubject.unsubscribe();
  }

  public onBaseCurrencyChanged(newCurrency: string) {
    this.historyService.setBaseCurrency(newCurrency);
    this.baseCurrency = newCurrency;
    // History Service will not emit on currency change
    // So have to update manually so flag will update
  }

  public onTargetCurrencyChanged(newCurrency: string) {
    this.historyService.setTargetCurrency(newCurrency);
    this.targetCurrency = newCurrency;
  }

  public onIsMonthlyChanged() {
    const valString = (this.isMonthlyInput.nativeElement as HTMLSelectElement)
      .value;
    this.historyService.setIsMonthly(valString === 'monthly');
  }

  public onClickUpdate() {
    this.historyService.emitHistoryPointsDebounced();
  }
}
