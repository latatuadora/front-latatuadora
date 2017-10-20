import numeral from 'numeral';

export class CurrencyValueConverter {
  toView(value, currency, hideDecimals) {
    let currencyText = currency ? ' ' + currency : '';
    let format = hideDecimals ? '$ 0,0' : '$ 0,0.00'
    return numeral(value).format(format) + ' ' + currencyText;
  }
}