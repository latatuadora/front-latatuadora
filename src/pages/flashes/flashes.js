import {inject} from 'aurelia-framework';
import {WebAPI} from 'utils/web-api';
import {BaseGallery} from 'utils/base-gallery';

@inject(WebAPI)
export class Flashes extends BaseGallery {
  constructor(api) {
    super(api);
    this.apiMethod = 'getFlashes';
  }
}