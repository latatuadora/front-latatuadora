import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';
import {BaseGallery} from 'utils/base-gallery';

@inject(MockAPI)
export class SearchArtist extends BaseGallery {
  constructor(api) {
    super(api);
    this.apiMethod = 'getArtists';
    this.params = {
      style: '',
      type: '',
      page: 1
    };
    this.lists = {
      styles: [],
      types: []
    };
    this.activeIds = {
      style: -1,
      type: -1
    };
    this.showDropdowns = {
      styles: false,
      types: false
    };
  }

  checkParams(params) {
    if (params.style) {
      this.params.style = params.style;
      this.activeIds.style = -1;
    }
    if (params.type) {
      this.params.type = params.type;
      this.activeIds.type = -1;
    }
  }

  getLists() {
    this.getStyles();
    this.getTypes();
  }

  getTypes() {
    this.lists.types = [
      {
        id: 0,
        name: 'Estudio'
      },
      {
        id: 1,
        name: 'Freelance'
      }
    ];
    if (this.params.type == this.lists.types[0].name) {
      this.activeIds.type = 0;
    } else {
      this.activeIds.type = 1;
    }
  }

  setType = type => {
    if (type.name !== this.params.type) {
      this.params.type = type.name;
      this.activeIds.type = type.id;
      this.filterItems();
    }
  }

  resetParams() {
    this.params = {
      style: '',
      type: '',
      page: 1
    };
    this.activeIds = {
      style: -1,
      type: -1
    };
  }
}