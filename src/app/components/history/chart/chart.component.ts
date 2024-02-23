import { Component, Input, afterRender } from '@angular/core';
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
  public chartOptions: AgChartOptions = {
    data: [],
    series: [{ type: 'line', xKey: 'xKey', yKey: 'value' }],
    background: {
      fill: '#e0f2fe',
    },
  };

  @Input()
  set inputData(data: HistoryPoint[]) {
    this.chartOptions = { ...this.chartOptions, data };
    this.scrollingService.scrollToBottom();
  }

  constructor(private scrollingService: ScrollingService) {}
}
