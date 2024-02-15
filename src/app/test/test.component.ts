import { Component, OnInit } from '@angular/core';
import { ConverterService } from '../services/converter.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [HttpClientModule],
  template: ` <p>test works!</p> `,
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit {
  constructor(private converterService: ConverterService) {}
  ngOnInit(): void {
    console.log(this.converterService.getConversionRate('MYR', 'GBP'));
  }
}
