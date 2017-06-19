import {bindable, inject} from 'aurelia-framework';
import flatpickr from 'flatpickr';
import es from 'flatpickr_es';

@inject(Element)
export class CalendarCustomAttribute {
  @bindable options = {inline: true};
  @bindable value;

  constructor(element) {
    this.element = element;
    this.options.onChange = this.onChange;
    this.options.locale = es.es;
  }

  bind() {
    if (!this.value || !(this.value instanceof Date)) {
      throw new Error('Value not found or not a Date object');
    }
    this.options.minDate = this.value;
  }

  attached() {
    this.calendar = flatpickr(this.element, this.options);
    console.log(this.calendar);
  }

  onChange = (value) => {
    this.value = value;
  }
}