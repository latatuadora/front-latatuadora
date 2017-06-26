import {inject} from 'aurelia-framework';
import {BaseGallery} from 'utils/base-gallery';
import {MockAPI} from 'utils/mock-api';

@inject(MockAPI)
export class Favourites extends BaseGallery {
  constructor(api) {
    super(api);
    this.apiMethod = 'getFavourites';
  }
}