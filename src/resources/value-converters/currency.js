import numeral from 'numeral';

export class CurrencyValueConverter {
  toView(value, currency) {
    return numeral(value).format('$ 0,0.00') + currency;
  }
}