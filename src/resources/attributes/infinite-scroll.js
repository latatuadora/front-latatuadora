import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class InfiniteScrollCustomAttribute {
  @bindable callback;

  self = {};

  constructor(element) {
    this.element = element;
  }

  attached() {
    self = this;
    this.checkPosition();
    document.addEventListener('scroll', this.checkPosition);
    document.addEventListener('resize', this.changeTopPosition);
  }

  detached() {
    document.removeEventListener('scroll', this.checkPosition);
    document.removeEventListener('resize', this.changeTopPosition);
  }

  changeTopPosition() {
    self.top = self.element.getBoundingClientRect().top;
  }

  checkPosition() {
    let scroll = window.pageYOffset;
    let clientRect = self.element.getBoundingClientRect();
    self.top = self.top ? self.top : clientRect.top;

    let triggerAt = clientRect.height - (self.top / 2);
    let trigger = triggerAt < scroll;

    if (trigger && clientRect.height) {
      self.callback();
    }
  }
}