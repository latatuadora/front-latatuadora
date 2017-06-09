import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class DropdownModal {
  @bindable list;
  @bindable onClick;
  @bindable itemName;
  @bindable activeId;
  @bindable refElement;
  @bindable visible;
  @bindable close;
  @bindable topReference;
  @bindable alwaysCentered = false;
  @bindable type = 'tags';

  constructor(element) {
    this.element = element;
  }

  attached() {
    let clientRect = this.refElement.getBoundingClientRect();
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
    this.adjustCoordinates(clientRect, true, true);
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
      if (9 + clientRect.top + clientRect.height > topLimit) {
        this.elementsList.style.top = 9 + clientRect.top + clientRect.height + 'px';
      } else {
        this.elementsList.style.top = topLimit + 'px';
      }
    }
    if (adjustLeft) {
      let spaceAvailable = clientRect.left + this.elementsList.offsetWidth < window.innerWidth;
      let center = this.elementsList.offsetWidth < window.innerWidth;
      if (spaceAvailable && !this.alwaysCentered) {
        this.elementsList.style.left = clientRect.left + 'px';
      } else if (center || this.alwaysCentered){
        let difference = window.innerWidth - this.elementsList.offsetWidth;
        this.elementsList.style.left = (difference / 2) + 'px';
      } else {
        this.elementsList.style.left = '0px';
      }
    }
  }

  detached() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }
}