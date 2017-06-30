import {inject} from 'aurelia-framework';
import {WebAPI} from 'utils/web-api';
import {BaseGallery} from 'utils/base-gallery';

@inject(WebAPI)
export class Inspirate extends BaseGallery {
  constructor(api) {
    super(api);
    this.apiMethod = 'getTattoos';
    this.params['part'] = null;
    this.activeElements['part'] = null;
    this.lists['parts'] = [];
    this.showDropdowns['parts'] = false;
  }

  checkParams(params) {
    super.checkParams(params);
    if (params.part) {
      this.params.part = parseInt(params.part);
    }
  }

  getLists() {
    super.getLists();
    this.getBodyParts();
  }

  getBodyParts() {
    this.api.getBodyParts()
      .then(parts => {
        parts.forEach(part => {
          if (this.params.part == part.id) {
            this.activeElements.part = part;
          }
        });
        this.lists.parts = parts;
      });
  }

  setBodyPart = part => {
    if (part.id !== this.params.part) {
      this.params.part = part.id;
      this.activeElements.part = part;
      this.filterItems();
      this.allEmpty = false;
    }
  }

  resetParams() {
    super.resetParams();
    this.params['part'] = null;
    this.activeElements['part'] = null;
  }
}