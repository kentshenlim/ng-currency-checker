import { Component } from '@angular/core';
import { ConverterService } from '../../services/converter.service';

@Component({
  selector: 'app-converter-form',
  standalone: true,
  imports: [],
  template: `
    <div>
      <form>
        <div>
          <div>
            <label for="base-currency">Amount</label>
            <input type="text" id="base-currency" name="baseCurrency" />
            <input
              type="number"
              id="base-currency-amount"
              name="baseCurrencyAmount"
            />
          </div>
          <div>
            <label for="currency">Converted Amount</label>
            <input type="text" id="currency" name="currency" />
            <input type="number" id="currency-amount" name="currencyAmount" />
          </div>
        </div>
      </form>
    </div>
  `,
  styles: ``,
})
export class ConverterFormComponent {
  constructor(private converterService: ConverterService) {}
}
