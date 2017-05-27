import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

@inject(MockAPI)
export class Step3 {
  constructor(api) {
    this.api = api;
    this.bodyParts = {};
  }

  activate(model) {
    this.model = model;
    this.selectedId = model.bodyPart;
    this.getBodyParts();
  }

  getBodyParts() {
    this.api.getBodyParts()
      .then(data => {
        this.bodyParts = data;
      });
  }

  isValid() {
    return this.model.bodyPart.type != '' && this.model.bodyPart.id != -1;
  }
}