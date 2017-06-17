import moment from 'moment';
import locale_es from 'moment_es';

moment.locale('es', locale_es);

export class DateValueConverter {
  toView(value) {
    let text = moment(value).format('dddd D [de] MMMM YYYY h:mma');
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}