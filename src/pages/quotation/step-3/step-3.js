import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

@inject(MockAPI)
export class Step3 {
  constructor(api) {
    this.api = api;
    this.bodyParts = {};
    this.activeType = 'front';
    this.defaultImage = 'src/assets/images/etc/bodypart-noselection.png';
  }

  activate(model) {
    this.model = model;
    this.selectedImage = model.bodyPart.image ? model.bodyPart.image : this.defaultImage;
    this.getBodyParts();
  }

  changeType(type) {
    this.activeType = type;
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