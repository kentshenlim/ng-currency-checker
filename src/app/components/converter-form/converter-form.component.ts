import { Component } from '@angular/core';
import { ConverterService } from '../../services/converter.service';
import { ConverterFormPanelComponent } from './converter-form-panel/converter-form-panel.component';

@Component({
  selector: 'app-converter-form',
  standalone: true,
  imports: [ConverterFormPanelComponent],
  template: `
    <div>
      <app-converter-form-panel
        headerText="Amount"
        idPrefix="base"
        selectedCode="JPY"
      />
      <app-converter-form-panel
        headerText="Converted Amount"
        idPrefix="target"
        selectedCode="GBP"
      />
    </div>
  `,
  styles: ``,
})
export class ConverterFormComponent {
  constructor(private converterService: ConverterService) {}
}
