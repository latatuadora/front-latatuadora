import {BaseModal} from 'utils/base-modal';
import {bindable} from 'aurelia-framework';

export class SchedulingItem extends BaseModal {
  @bindable currentindex;
  @bindable schedule;
  
  constructor() {
    super();
    let that = this;
    let timer = setInterval(function() {
      if (that.schedule !== null) {
        that.getDate(that.schedule.createdAt);
        if (that.schedule.image) {
          that.image = that.schedule.image.split('/');
        }
        clearInterval(timer);
      }
    });
  }
  
  getDate(dateSchedule) {
    let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    let date = new Date(dateSchedule);
    this.day = date.getDate();
    this.month = monthNames[date.getMonth()];
    this.hour = date.getHours();
  }
}
