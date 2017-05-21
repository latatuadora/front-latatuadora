import {customAttribute, inject} from 'aurelia-framework';

@customAttribute('masonry-item')
@inject(Element)
export class MasonryItem {
  constructor(element) {
    this.element = element;
  }

  bind(bindingContext, overridingContext) {
    this.parent = overridingContext.parentOverrideContext.bindingContext;
    this.index = overridingContext.$index;
  }

  attached() {
    this.parent.appendItem(this.element);
    if (this.index == 0) {
      let evt = document.createEvent("HTMLEvents");
      evt.initEvent('resize', true, false);
      window.dispatchEvent(evt);
    }
  }

  detached() {
    this.parent.removeItem(this.element);
  }
}