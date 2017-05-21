import {customAttribute, inject} from 'aurelia-framework';

@customAttribute('masonry-item')
@inject(Element)
export class MasonryItem {
  constructor(element) {
    this.element = element;
  }

  bind(bindingContext, overridingContext) {
    this.parent = overridingContext.parentOverrideContext.bindingContext;
    this.grid = this.parent.__masonry_grid__;
    this.index = overridingContext.$index;
  }

  attached() {
    this.grid.appendItem(this.element);
    if (this.index == 0) {
      this.grid.triggerResize();
    }
  }

  detached() {
    this.grid.removeItem(this.element);
  }
}