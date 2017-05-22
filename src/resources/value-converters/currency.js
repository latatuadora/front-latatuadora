import numeral from 'numeral';

export class CurrencyValueConverter {
  toView(value, currency) {
    let currencyText = currency ? ' ' + currency : '';
    return numeral(value).format('$ 0,0.00') + ' ' + currencyText;
  }
}