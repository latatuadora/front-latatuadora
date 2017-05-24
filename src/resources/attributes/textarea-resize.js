import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class TextareaResizeCustomAttribute {
  @bindable text;

  constructor(element) {
    this.element = element;
  }

  textChanged() {
    this.resize();
  }

  resize() {
    this.element.style.height = this.element.style.minHeight;
    this.element.style.height = this.element.scrollHeight + 'px';
  }
}