import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CurrencyService } from '../../data/services/currency.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currencyService = inject(CurrencyService);
  exchangeRates: {USD: number, EUR: number,  } | null = null;

  constructor() {
    this.currencyService.getExchangeRates().subscribe(value => {
      this.exchangeRates = {
        USD: 1 / value.conversion_rates.USD,
        EUR: 1 / value.conversion_rates.EUR,
        
      };
    });
  }
}
