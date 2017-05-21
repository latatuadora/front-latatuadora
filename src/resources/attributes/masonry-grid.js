import {customAttribute, inject} from 'aurelia-framework';

@customAttribute('masonry-grid')
@inject(Element)
export class MasonryGrid {
  constructor(element) {
    this.element = element;
  }
}