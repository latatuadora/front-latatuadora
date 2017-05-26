import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';
import {BaseGallery} from 'utils/base-gallery';

@inject(MockAPI)
export class Inspirate extends BaseGallery {
  constructor(api) {
    super(api);
    this.apiMethod = 'getTattoos';
    this.params = {
      style: '',
      element: '',
      part: '',
      page: 1
    }
  }

  checkParams(params) {
    if (params.style) {
      this.params.style = params.style;
    }
    if (params.element) {
      this.params.element = params.element;
    }
    if (params.part) {
      this.params.part = params.part;
    }
  }

  setBodyPart(part) {
    if (part !== this.params.part) {
      this.params.part = part;
      this.filterTattoos();
    }
  }

  resetParams() {
    this.params = {
      style: '',
      element: '',
      part: '',
      page: 1
    }
  }
}