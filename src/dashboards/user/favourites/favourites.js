import {inject} from 'aurelia-framework';
import {BaseGallery} from 'utils/base-gallery';
import {MockAPI} from 'utils/mock-api';

@inject(MockAPI)
export class Favourites extends BaseGallery {
  constructor(api) {
    super(api);
    this.apiMethod = 'getFavourites';
    this.params = {
      type1: '',
      type2: '',
      page: 1
    };
    this.lists = {
      type1: [],
      type2: []
    };
    this.activeIds = {
      type1: -1,
      type2: -1
    };
    this.showDropdowns = {
      type1: false,
      type2: false
    };
  }

  getLists() {
    this.getType1();
    this.getType2();
  }

  resetParams() {
    this.params = {
      type1: '',
      type2: '',
      page: 1
    };
    this.activeIds = {
      type1: -1,
      type2: -1
    };
    this.allEmpty = true;
  }

  getType1() {
    this.lists.type1 = ['Tatuajes', 'Flashes'];
  }

  getType2() {
    this.lists.type2 = ['Estudio', 'Freelancer'];
  }
}