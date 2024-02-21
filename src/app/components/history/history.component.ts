import { Component } from '@angular/core';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ChartComponent],
  template: ` <app-chart />`,
})
export class HistoryComponent {}
