import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import * as R from 'ramda';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  icon = faSearch;
  currencies: any[];
  searchText: string;

  constructor(private _http: HttpService) { }

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
      }
    );
  }

}
