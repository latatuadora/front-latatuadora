import { observable,  child, bindable } from 'aurelia-framework';

export class Masonry {

  @bindable element
  @observable({ changeHandler: 'itemsChanged' }) items;

  constructor() {
    console.warn(this.element)
  }

  attached() {
    console.warn(this.template)
  }

  bind() {
    console.warn(this.template)
  }


}
