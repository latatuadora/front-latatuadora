import {bindable, inject} from 'aurelia-framework';
import flatpickr from 'flatpickr';

@inject(Element)
export class CalendarCustomAttribute {
  @bindable options = {inline: true};
  @bindable value;

  constructor(element) {
    this.element = element;
    this.options.onChange = this.onChange;
  }

  bind() {
    if (!this.value || !(this.value instanceof Date)) {
      throw new Error('Value not found or not a Date object');
    }
  }

  attached() {
    this.calendar = flatpickr(this.element, this.options);
  }

  onChange = (value) => {
    this.value = value;
  }
}