import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CurrenciesService } from '../../../services/currencies.service';

@Component({
  selector: 'app-converter-form-panel',
  standalone: true,
  imports: [],
  template: `
    <form>
      <h3>{{ headerText }}</h3>
      <div>
        <label [for]="idPrefix + 'Currency'">Amount</label>
        <select
          [name]="idPrefix + 'Currency'"
          [id]="idPrefix + 'Currency'"
          (change)="onChangeCurrency()"
          #currencySelected
        >
          @for (code of codeArray; track code) {
          <option [value]="code" [selected]="selectedCode === code">
            {{ code }}
          </option>
          }
        </select>
      </div>
      <div>
        <input
          type="number"
          [id]="idPrefix + 'Amount'"
          [name]="idPrefix + 'Amount'"
        />
      </div>
    </form>
  `,
  styles: `
    form {
      border: solid red 3px;
    }
  `,
})
export class ConverterFormPanelComponent implements OnInit {
  @Input() headerText = 'Amount';
  @Input() idPrefix = '';
  @Input() selectedCode = '';
  codeArray: string[] = [];
  @Output() currencyChanged = new EventEmitter<string>();
  @ViewChild('currencySelected') currencySelected!: ElementRef;

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.codeArray = this.currenciesService.getCodeList();
  }

  onChangeCurrency() {
    this.currencyChanged.emit(
      (this.currencySelected.nativeElement as HTMLSelectElement).value
    );
  }
}
