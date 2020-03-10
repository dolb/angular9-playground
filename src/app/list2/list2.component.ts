import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import * as R from 'ramda';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-list2',
  templateUrl: './list2.component.html',
  styleUrls: ['./list2.component.scss']
})
export class List2Component implements OnInit {

  icon = faSearch;
  currencies: any[];
  currenciesFiltered: any[];
  searchText: string;
  tmCallback: any;
  tmCallbackTs: any;
  loader: boolean;

  constructor(private _http: HttpService) { }

  bpFilter(ev: any) {
    let value = ev.currentTarget.value;
    this.loader = true;
    let timeoutTick = 160;
    if(this.tmCallback) {
      clearTimeout(this.tmCallback);
      const tsNow = Date.now();
      if (this.tmCallbackTs) {
        timeoutTick = tsNow - this.tmCallbackTs;
      } 
      this.tmCallbackTs = tsNow;
    }
    
    this.tmCallback = setTimeout(
      this.filter.bind(this, value),
      timeoutTick,
    );
  }

  filter(value: string) {
    let searchText = value;
    const items = this.currencies;
    this.tmCallbackTs = null;

    if (!items) {
      this.currenciesFiltered = [];
    } else if (!searchText) {
      this.currenciesFiltered = items;
    } else {
      searchText = searchText.toLocaleLowerCase();
      this.currenciesFiltered = R.filter(
        (it: any) => it.name.toLocaleLowerCase().includes(searchText) || it.symbol.toLocaleLowerCase().includes(searchText), items);
    }
    this.loader = false;
  }

  ngOnInit(): void {
    let cryptolist = this._http.getCryptoList();
    this._http.fetchCurrencies().subscribe(
      (data: any) => {
        
        let list = R.map(
          (element: any) => {
            let base = R.find(x => x === element.symbol.toLowerCase(), cryptolist);
            let src = base ? `/assets/images/color/${base}.png` : '/favicon.ico';
            let marketCap = Number(element.quote.USD.market_cap).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return ({
              ...element,
              src,
              marketCap,
            })
          },
          data.data,
        );

        this.currencies = list;
        this.currenciesFiltered = list;
      }
    );
  }

}
