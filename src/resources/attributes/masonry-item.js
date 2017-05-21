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
    this.initialHeight = this.element.clientHeight;
    this.grid.appendItem(this.element);
    if (this.index == 0) {
      this.grid.triggerResize();
    }
    this.waitForImages();
  }

  waitForImages() {
    let images = this.element.getElementsByTagName('img');
    let self = this;
    let loaded = (e, i) => {
      let image = e.path[0];
      if (self.initialHeight !== self.element.clientHeight) {
        self.grid.reLayout();
      }
    }

    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      if (!image.complete) {
        image.addEventListener('load', loaded);
      }
    }
  }

  detached() {
    this.grid.removeItem(this.element);
  }
}