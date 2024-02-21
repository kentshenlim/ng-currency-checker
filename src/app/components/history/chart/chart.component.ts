import { Component } from '@angular/core';
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
  private data: HistoryPoint[] = [
    { month: 'Jan', value: 1 },
    { month: 'Feb', value: 5 },
    { month: 'Mar', value: 3 },
    { month: 'Apr', value: 6 },
    { month: 'May', value: 2 },
    { month: 'Jun', value: 6 },
    { month: 'Jul', value: 8 },
    { month: 'Aug', value: 12 },
    { month: 'Sep', value: 3 },
    { month: 'Oct', value: 5 },
    { month: 'Nov', value: 5 },
    { month: 'Dec', value: 4 },
  ];
  public chartOptions: AgChartOptions = {
    data: this.data,
    series: [{ type: 'line', xKey: 'month', yKey: 'value' }],
  };
}
