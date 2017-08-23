import { observable } from 'aurelia-framework';

export class Masonry {

  @observable({ changeHandler: 'itemsChanged' }) items;

  constructor(items, selector, element) {
    this.element = element
    this.items = items
    this.selector = selector
  }

  bind() {

  }



}
