import { Component, OnInit } from '@angular/core';
import { ConverterService } from '../services/converter.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  template: ` <p>test works!</p> `,
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit {
  constructor(private converterService: ConverterService) {}
  ngOnInit(): void {
    this.converterService.getConversionRate('MYR', 'GBP').subscribe((res) => {
      console.log(res);
    });
  }
}
