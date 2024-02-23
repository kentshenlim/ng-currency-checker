import { Component, OnDestroy, OnInit } from '@angular/core';
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
    <div>
      <div class="flex justify-between items-center">
        <app-currency-selector
          [isBase]="true"
          [selectedCode]="baseCurrency"
          (currencyChanged)="onBaseCurrencyChanged($event)"
        />
        <ion-icon
          name="arrow-forward-sharp"
          class="text-xl text-ACCENT"
        ></ion-icon>
        <app-currency-selector
          [isBase]="false"
          [selectedCode]="targetCurrency"
          (currencyChanged)="onTargetCurrencyChanged($event)"
        />
      </div>
      <button type="button" (click)="onClickUpdate()">Update</button>
      <app-chart [inputData]="historyPoints" />
    </div>
  `,
})
export class HistoryComponent implements OnInit, OnDestroy {
  public baseCurrency = 'MYR';
  public targetCurrency = 'MYR';
  public historyPoints: HistoryPoint[] = [];
  private historyEmitSubject!: Subscription;

  constructor(private historyService: HistoryService) {
    this.baseCurrency = this.historyService.getBaseCurrency();
    this.targetCurrency = this.historyService.getTargetCurrency();
  }

  ngOnInit(): void {
    // console.log(this.historyService.getDateStrings());
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

  public onClickUpdate() {
    this.historyService.emitHistoryPointsDebounced();
  }
}
