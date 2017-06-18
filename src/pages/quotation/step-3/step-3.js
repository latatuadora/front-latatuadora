import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

@inject(MockAPI)
export class Step3 {
  constructor(api) {
    this.api = api;
    this.bodyParts = {};
    this.showModal = false;
    this.activeType = 'front';
    this.defaultImage = 'src/assets/images/etc/bodypart-noselection.png';
    this.images = {
      front: this.defaultImage,
      back: this.defaultImage
    };
    window.addEventListener('resize', this.onResize);
  }

  activate(model) {
    this.model = model;
    if (model.bodyPart.type) {
      this.activeType = model.bodyPart.type;
      this.images[model.bodyPart.type] = model.bodyPart.image;
    }
    this.getBodyParts();
  }

  selectPart = (part) => {
    this.images[this.activeType] = part.image;
    this.images[this.activeType == 'front' ? 'back' : 'front'] = this.defaultImage;
    this.model.changePart(this.activeType, part.id, part.image);
  }

  toggleType(sourceType) {
    let mobile = window.matchMedia('(max-width: 767px)');
    let changeType = () => {
      this.activeType = (this.activeType == 'front') ? 'back' : 'front';
    }
    if (mobile.matches) {
      if (sourceType == 'image') {
        changeType();
      }
    } else {
      if (sourceType == 'title') {
        changeType();
      }
    }
  }

  getBodyParts() {
    this.api.getBodyParts()
      .then(data => {
        this.bodyParts = data;
      });
  }

  toggleList() {
    this.showModal = !this.showModal;
  }

  onResize = () => {
    if (!window.matchMedia('(max-width: 767px)').matches) {
      this.showModal = false;
    }
  }

  detached() {
    window.removeEventListener('resize', this.onResize);
  }

  isValid() {
    return this.images[this.activeType] != this.defaultImage;
  }
}