import {bindable, inject} from 'aurelia-framework';
import flatpickr from 'flatpickr';
import es from 'flatpickr_es';

@inject(Element)
export class CalendarCustomAttribute {
  @bindable options = {inline: true};
  @bindable value;
  @bindable schedulesuser;
  @bindable schedules;

  constructor(element) {
    this.element = element;
    this.options.onChange = this.onChange;
    this.options.locale = es.es;
  }

  bind() {
    let that = this;
    if (!this.value || !(this.value instanceof Date)) {
      throw new Error('Value not found or not a Date object');
    }
    this.options.minDate = this.value;
  }

  attached() {
    this.calendar = flatpickr(this.element, this.options);
  }
  
  onChange = (value) => {
    let that = this;
    this.value = value;
    this.intervalId = setInterval(function() {
      if (that.schedulesuser !== null) {
        that.schedules = [];
        that.schedulesuser.forEach(function(day) {
          if (day.dayId === (value[0].getDay() + 1)) {
            for(let i = parseInt(day.start); i <= parseInt(day.end); i++) {
              that.schedules.push(i);
            }
          }
        });
        clearInterval(that.intervalId);
      }
    });
  }
}
