import {bindable} from 'aurelia-framework';

export class TattooItemModal {
  @bindable tattoo;
  
  constructor() {
    this.tattoos = [];
  }
}
