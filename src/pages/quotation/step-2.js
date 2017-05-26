import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

@inject(MockAPI)
export class Step2 {
  constructor(api) {
    this.api = api;
    this.items = [];
  }

  activate(model) {
    this.model = model;
    this.getItems();
  }

  getItems() {
    this.api.getStyles()
      .then((styles) => {
        if (this.model.style == null) {
          styles[0].active = true;
        }
        styles.forEach((style) => {
          if (this.model.style == style.style_name) {
            style.active = true;
          }
          this.items.push(style);
        });
      });
  }
}