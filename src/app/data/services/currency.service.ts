import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ExchangeRatesResponse {
  result: string;
  base_code: string;
  conversion_rates: {
    USD: number;
    EUR: number;

  };
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  http = inject(HttpClient);

  getExchangeRates(): Observable<ExchangeRatesResponse> {
    return this.http.get<ExchangeRatesResponse>("https://v6.exchangerate-api.com/v6/f9d4e65d90dcaf8aab7625cf/latest/UAH");
  }
}
