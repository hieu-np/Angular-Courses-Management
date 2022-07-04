import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyvnd'
})
export class CurrencyvndPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value + ' đ';
  }

}
