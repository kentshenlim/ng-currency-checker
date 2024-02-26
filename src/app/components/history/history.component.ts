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
          class="rounded-lg bg-neutral-200 p-2 flex items-center"
          [disabled]="isLoading"
        >
          @if (!isLoading) {
          <p>Update</p>
          } @else {
          <ion-icon name="cog-sharp" class="animate-spin text-lg text-ACCENT"
            >Update</ion-icon
          >
          }
        </button>
      </div>
    </div>
    <div class="canva" [class.animate-pulse]="isLoading">
      <app-chart
        [baseCurrency]="baseCurrency"
        [targetCurrency]="targetCurrency"
        [inputData]="historyPoints"
      />
    </div>
  `,
})
export class HistoryComponent implements OnInit, OnDestroy {
  baseCurrency = 'MYR';
  targetCurrency = 'MYR';
  isMonthly = true;
  @ViewChild('isMonthlyInput') isMonthlyInput!: ElementRef;
  historyPoints: HistoryPoint[] = [];
  private historySubscription!: Subscription;
  isLoading = false;

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.baseCurrency = this.historyService.getBaseCurrency();
    this.targetCurrency = this.historyService.getTargetCurrency();
    this.isMonthly = this.historyService.getIsMonthly();
    this.historyPoints = this.historyService.getHistoryPoints();
    this.historySubscription = this.historyService
      .getHistoryDataSubject()
      .subscribe((data) => {
        this.baseCurrency = data.baseCurrency;
        this.targetCurrency = data.targetCurrency;
        this.isMonthly = data.isMonthly;
        this.historyPoints = data.historyPoints;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.historySubscription.unsubscribe();
  }

  onBaseCurrencyChanged(newCurrency: string) {
    this.historyService.setBaseCurrency(newCurrency);
  }

  onTargetCurrencyChanged(newCurrency: string) {
    this.historyService.setTargetCurrency(newCurrency);
  }

  onIsMonthlyChanged() {
    const valString = (this.isMonthlyInput.nativeElement as HTMLSelectElement)
      .value;
    this.historyService.setIsMonthly(valString === 'monthly');
  }

  onClickUpdate() {
    this.isLoading = true;
    this.historyService.emitHistoryPointsDebounced();
  }
}
