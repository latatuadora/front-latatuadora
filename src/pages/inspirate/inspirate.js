import {inject} from 'aurelia-framework';
import {WebAPI} from 'utils/web-api';
import {Controller} from 'controller/controller'
import {BaseGallery} from 'utils/base-gallery';
import {TattooStyle} from 'resources/elements/tattoo-style/tattoo-style'

@inject(WebAPI, Controller)
export class Inspirate extends BaseGallery {
  constructor(api, controller) {
    super(api);
    this.controller = controller
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

    if (params.style) {
      this.params.style = parseInt(params.style);
    }
  }

  getLists() {
    super.getLists();
    this.getBodyParts();
  }

  getBodyParts() {
    this.controller.tattoo.bodyParts()
      .then(parts => {

        parts.forEach(part => {
          if (this.params.part == part.id) {
            this.activeElements.part = part;
          }
        });
        this.lists.parts = parts;
      })
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
    this.params['part'] = '';
    this.activeElements['part'] = '';
  }
}
