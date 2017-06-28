import {inject} from 'aurelia-framework';
import {WebAPI} from 'utils/web-api';
import {BaseGallery} from 'utils/base-gallery';

@inject(WebAPI)
export class Inspirate extends BaseGallery {
  constructor(api) {
    super(api);
    this.apiMethod = 'getTattoos';
    this.params['part'] = '';
    this.activeIds['part'] = {};
    this.lists['parts'] = [];
    this.showDropdowns['parts'] = false;
  }

  checkParams(params) {
    super.checkParams(params);
    if (params.part) {
      this.params.part = params.part;
      this.activeIds.part = -1;
    }
  }

  getLists() {
    super.getLists();
    this.getBodyParts();
  }

  getBodyParts() {
    this.api.getBodyParts()
      .then(parts => {
        this.lists.parts = parts.front.concat(parts.back);
        this.lists.parts.forEach(part => {
          if (this.params.part == part.name) {
            this.activeIds.part = part.id;
          }
        });
      });
  }

  setBodyPart = part => {
    if (part.name !== this.params.part) {
      this.params.part = part.name;
      this.activeIds.part = part.id;
      this.filterItems();
      this.allEmpty = true;
    }
  }

  resetParams() {
    super.resetParams();
    this.params['part'] = '';
    this.activeIds['part'] = -1;
  }
}