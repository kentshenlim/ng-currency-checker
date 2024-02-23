import { Component, Input } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { HistoryPoint } from '../../../interfaces/history-point';
import { ScrollingService } from '../../../services/scrolling.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [AgChartsAngular],
  template: `
    <ag-charts-angular [options]="chartOptions" style="height: 100%" />
  `,
})
export class ChartComponent {
  @Input() baseCurrency = 'MYR';
  @Input() targetCurrency = 'MYR';
  @Input()
  set inputData(data: HistoryPoint[]) {
    this.chartOptions = {
      ...this.chartOptions,
      data,
      title: { text: `${this.baseCurrency} to ${this.targetCurrency}` }, // Must update the two currencies
      // The definition at preamble will not run again because the component is
      // not instantiated again
    };
    this.scrollingService.scrollToBottom();
  }

  public chartOptions: AgChartOptions = {
    data: [],
    series: [{ type: 'line', xKey: 'xKey', yKey: 'value' }],
    background: {
      fill: '#e0f2fe',
    },
    overlays: {
      noData: {
        text: 'Click Update to fetch trend',
      },
    },
    title: { text: `${this.baseCurrency} to ${this.targetCurrency}` },
  };

  constructor(private scrollingService: ScrollingService) {}
}
