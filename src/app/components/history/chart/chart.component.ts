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
  private currentBaseCurrency = 'MYR';
  private currentTargetCurrency = 'MYR';
  private currentPointData: HistoryPoint[] = [];
  chartOptions: AgChartOptions = {
    data: this.currentPointData,
    series: [{ type: 'line', xKey: 'xKey', yKey: 'value' }],
    background: {
      fill: '#e0f2fe',
    },
    overlays: {
      noData: {
        text: 'Click Update to fetch trend',
      },
    },
    title: {
      text: `${this.currentBaseCurrency} to ${this.currentTargetCurrency}`,
    },
  };
  @Input() set baseCurrency(data: string) {
    this.currentBaseCurrency = data;
    this.updateChartOption();
  }
  @Input() set targetCurrency(data: string) {
    this.currentTargetCurrency = data;
    this.updateChartOption();
  }
  @Input() set inputData(data: HistoryPoint[]) {
    this.currentPointData = data;
    this.updateChartOption();
    this.scrollingService.scrollToBottom();
  }

  constructor(private scrollingService: ScrollingService) {}

  private updateChartOption() {
    this.chartOptions = {
      ...this.chartOptions,
      data: this.currentPointData,
      title: {
        text: `${this.currentBaseCurrency} to ${this.currentTargetCurrency}`,
      },
    };
  }
}
