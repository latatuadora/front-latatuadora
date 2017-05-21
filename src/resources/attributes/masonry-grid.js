import {customAttribute, inject} from 'aurelia-framework';
import masonry from 'masonry-layout';

@customAttribute('masonry-grid')
@inject(Element)
export class MasonryGrid {
  constructor(element) {
    this.element = element;
  }

  bind(bindingContext) {
    this.bindingContext = bindingContext;
    this.masonry = new masonry(this.element);
    bindingContext.__masonry_grid__ = this;
  }

  appendItem(item) {
    this.masonry.appended(item);
  }

  removeItem(item) {
    this.masonry.remove(item);
  }

  resetCols() {
    for (let i = 0; i < this.masonry.colYs.length; i++) {
      this.masonry.colYs[i] = 0;
    }
    this.element.style.height = 0;
    this.masonry.maxY = 0;
  }

  triggerResize() {
    let evt = document.createEvent('HTMLEvents');
    evt.initEvent('resize', true, false);
    window.dispatchEvent(evt);
  }

  detached() {
    this.bindingContext.__masonry_grid__ = null;
  }
}