import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class DropdownModal {
  @bindable list;
  @bindable onClick;
  @bindable itemName;
  @bindable activeId;
  @bindable refElement;
  @bindable show;
  @bindable showDropdown;
  @bindable close;
  @bindable topReference;

  constructor(element) {
    this.element = element;
  }

  attached() {
    let clientRect = this.refElement.getBoundingClientRect();
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
    this.adjustCoordinates(clientRect, true, true);
  }

  showDropdownChanged(newValue) {
    if (newValue && this.elementsList.offsetWidth == 0) {
      setTimeout(() => {
        let clientRect = this.refElement.getBoundingClientRect();
        this.adjustCoordinates(clientRect, true, true);
      }, 10);
    }
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
    if (this.showDropdown) {
      if (adjustTop) {
        let topLimit = document.querySelector(this.topReference).offsetHeight;
        if (9 + clientRect.top + clientRect.height > topLimit) {
          this.elementsList.style.top = 9 + clientRect.top + clientRect.height + 'px';
        } else {
          this.elementsList.style.top = topLimit + 'px';
        }
      }
      if (adjustLeft) {
        if (clientRect.left + this.elementsList.offsetWidth < window.innerWidth) {
          this.elementsList.style.left = clientRect.left + 'px';
        } else if (this.elementsList.offsetWidth < window.innerWidth){
          let difference = window.innerWidth - this.elementsList.offsetWidth;
          this.elementsList.style.left = (difference / 2) + 'px';
        } else {
          this.elementsList.style.left = '0px';
        }
      }
    }
  }

  detached() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }
}