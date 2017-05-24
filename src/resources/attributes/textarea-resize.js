import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class TestareaResizeCustomAttribute {
  constructor(element) {
    this.element = element;
  }
}