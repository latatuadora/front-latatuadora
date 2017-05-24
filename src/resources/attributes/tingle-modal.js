import {bindable, inject} from 'aurelia-framework';
import Modal from 'modal-vanilla';

@inject(Element)
export class TingleModalCustomAttribute {
  @bindable show;

  constructor(element) {
    this.element;
  }

  attached() {
    // this.modal = new tingle.modal(this.element);
    console.log(Modal);
  }
}