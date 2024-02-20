import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCustom',
  standalone: true,
})
export class CurrencyCustomPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): number {
    return Math.round(value * 100) / 100;
  }
}
