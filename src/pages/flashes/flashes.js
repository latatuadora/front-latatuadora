import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';
import {BaseGallery} from 'utils/base-gallery';

@inject(MockAPI)
export class Flashes extends BaseGallery {
  constructor(api) {
    super(api);
    this.apiMethod = 'getTattoos';
  }
}