import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

@inject(MockAPI)
export class Step2 {
  constructor(api) {
    this.api = api;
    this.items = [];
    this.activeIndex = 0;
  }

  activate(model) {
    this.model = model;
    this.getItems();
  }

  changeStyle(index) {
    this.model.changeStyle(this.items[index].style);
    this.activeIndex = index;
  }

  getItems() {
    this.api.getStyles()
      .then((styles) => {
        styles.forEach((style, index) => {
          if (this.model.style == style) {
            this.activeIndex = index;
          }
          this.items.push(style);
        });
      });
  }

  isValid() {
    return typeof this.items[this.activeIndex] != 'undefined';
  }
}
