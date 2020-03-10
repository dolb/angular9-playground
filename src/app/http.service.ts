import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import cryptolist from './cryptolist.js';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  fetchCurrencies() {
    return this.http.get('https://309iylfr22.execute-api.us-east-1.amazonaws.com/dev/get-markets')
    //return this.http.get('http://playlocal.test.pl/test.json')
  }

  getCryptoList() {
    return cryptolist;
  }
}
