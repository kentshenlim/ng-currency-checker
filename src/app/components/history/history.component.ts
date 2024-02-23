import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { HistoryService } from '../../services/history.service';
import { CurrencySelectorComponent } from '../_common-ui/currency-selector/currency-selector.component';
import { HistoryPoint } from '../../interfaces/history-point';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CurrencySelectorComponent, ChartComponent],
  template: `
    <div>
      <div>
        <app-currency-selector
          [isBase]="true"
          [selectedCode]="baseCurrency"
          (currencyChanged)="onBaseCurrencyChanged($event)"
        />
        <app-currency-selector
          [isBase]="false"
          [selectedCode]="targetCurrency"
          (currencyChanged)="onTargetCurrencyChanged($event)"
        />
        <button type="button" (click)="onClickUpdate()">Update</button>
      </div>
      <app-chart [inputData]="historyPoints" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui totam nemo
        quas est alias, eaque vero! Fugiat nihil voluptatum eligendi molestias
        quibusdam quaerat amet? Quae natus nesciunt ex minus maiores.
      </p>
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
  }

  public onTargetCurrencyChanged(newCurrency: string) {
    this.historyService.setTargetCurrency(newCurrency);
  }

  public onClickUpdate() {
    this.historyService.emitHistoryPointsDebounced();
  }
}
