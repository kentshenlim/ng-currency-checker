import { Component, OnInit } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ChartComponent],
  template: ` <app-chart />`,
})
export class HistoryComponent implements OnInit {
  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    // console.log(this.historyService.getDateStrings());
  }
}
