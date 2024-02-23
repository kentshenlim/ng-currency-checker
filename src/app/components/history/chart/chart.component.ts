import { Component, Input } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { HistoryPoint } from '../../../interfaces/history-point';

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
  };

  @Input()
  set inputData(data: HistoryPoint[]) {
    this.chartOptions = {
      data,
      series: [{ type: 'line', xKey: 'xKey', yKey: 'value' }],
    };
  }
}
