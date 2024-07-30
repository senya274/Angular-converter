import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CurrencyService } from '../../data/services/currency.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  currencyService = inject(CurrencyService);

  currencies = ['UAH', 'USD', 'EUR'];
  exchangeRates: { [key: string]: number } = {};
  
  amount1 = 1;
  amount2 = 1;
  currency1 = 'UAH';
  currency2 = 'USD';

  ngOnInit() {
    this.currencyService.getExchangeRates().subscribe(value => {
      this.exchangeRates = value.conversion_rates;
      this.convert('amount1'); 
    });
  }

  convert(source: 'amount1' | 'amount2') {
    if (!this.exchangeRates[this.currency1] || !this.exchangeRates[this.currency2]) {
      return;
    }

    if (source === 'amount1') {
      const amountInBaseCurrency = this.amount1 / this.exchangeRates[this.currency1];
      this.amount2 = amountInBaseCurrency * this.exchangeRates[this.currency2];
    } else {
      const amountInBaseCurrency = this.amount2 / this.exchangeRates[this.currency2];
      this.amount1 = amountInBaseCurrency * this.exchangeRates[this.currency1];
    }
  }

  onAmountChange(source: 'amount1' | 'amount2') {
    this.convert(source);
  }

  onCurrencyChange() {
    this.convert('amount1');
  }
}
