import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class DropdownModal {
  @bindable list;
  @bindable onClick;
  @bindable itemName;
  @bindable activeId;
  @bindable refElement;
  @bindable show;
  @bindable close;
  @bindable topReference;

  constructor(element) {
    this.element = element;
  }

  attached() {
    let clientRect = this.refElement.getBoundingClientRect();
    this.adjustCoordinates(clientRect, true, true);
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }

  selectItem(item) {
    this.onClick(item);
    this.close();
  }

  onResize = () => {
    let clientRect = this.refElement.getBoundingClientRect();
    this.adjustCoordinates(clientRect, true, true);
  }

  onScroll = () => {
    let clientRect = this.refElement.getBoundingClientRect();
    this.adjustCoordinates(clientRect, true, false);
  }

  adjustCoordinates(clientRect, adjustTop, adjustLeft) {
    if (adjustTop) {
      let topLimit = document.querySelector(this.topReference).offsetHeight;
      if (clientRect.top + clientRect.height > topLimit) {
        this.elementsList.style.top = clientRect.top + clientRect.height + 'px';
      } else {
        this.elementsList.style.top = topLimit + 'px';
      }
    }
    if (adjustLeft) {
      if (clientRect.left + this.elementsList.offsetWidth < window.innerWidth) {
        this.elementsList.style.left = clientRect.left + 'px';
      } else {
        this.elementsList.style.left = '0px';
      }
    }
  }
}