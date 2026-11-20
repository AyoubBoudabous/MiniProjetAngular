import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tndPrice',
})
export class TndPricePipe implements PipeTransform {
  transform(value: number): string {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 3
    }).format(value);
  }
}
