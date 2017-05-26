import {inject} from 'aurelia-framework';
import tippy from 'tippy-js';

@inject(Element)
export class TooltipMessageCustomAttribute {
  constructor(element) {
    this.element = element;
    this.tooltip = new tippy(element, {
      arrow: true,
      theme: 'latatuadora'
    });
  }

  detached() {
    let popper = this.tooltip.getPopperElement(this.element);
    this.tooltip.destroy(popper);
  }
}