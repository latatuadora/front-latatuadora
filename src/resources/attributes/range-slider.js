import {inject, bindable} from 'aurelia-framework';
import nouislider from 'nouislider';

@inject(Element)
export class RangeSliderCustomAttribute {
  @bindable update;
  @bindable min;
  @bindable max;
  @bindable start;
  @bindable unit;

  constructor(element) {
    this.element = element;
  }

  bind() {
    nouislider.create(this.element, {
      start: this.start,
      range: {
        min: this.min,
        max: this.max
      },
      format: {
        from: (value) => {return value.replace(` ${this.unit}`, '');},
        to: (value) => {return value + ` ${this.unit}`;}
      },
      step: 1
    });
    this.element.noUiSlider.on('update', (values) => {
      this.update(parseInt(values[0].replace(` ${this.unit}`, '')));
    });
  }

  unbind() {
    this.element.noUiSlider.off();
    this.element.noUiSlider.destroy();
  }
}