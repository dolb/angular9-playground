import { Pipe, PipeTransform } from '@angular/core';
import * as R from 'ramda';

@Pipe({
  name: 'currency_filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return R.filter(it => it.name.toLocaleLowerCase().includes(searchText) || it.symbol.toLocaleLowerCase().includes(searchText), items);
  }
}
