import {inject} from 'aurelia-framework';
import {WebAPI} from 'utils/web-api';
import {BaseGallery} from 'utils/base-gallery';

@inject(WebAPI)
export class SearchArtist extends BaseGallery {
  constructor(api) {
    super(api);
    this.apiMethod = 'getArtists';
    this.params = {
      style: null,
      type: null,
      page: 1
    };
    this.lists = {
      styles: [],
      types: []
    };
    this.activeElements = {
      style: null,
      type: null
    };
    this.showDropdowns = {
      styles: false,
      types: false
    };
  }

  checkParams(params) {
    if (params.style) {
      this.params.style = parseInt(params.style);
    }
    if (params.type) {
      this.params.type = parseInt(params.type);
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
    if (this.params.type == this.lists.types[0].id) {
      this.activeElements.type = this.lists.types[0]
    } else if (this.params.type == this.lists.types[1].id) {
      this.activeElements.type = this.lists.types[1];
    }
  }

  setType = type => {
    if (type.id !== this.params.type) {
      this.params.type = type.id;
      this.activeElements.type = type;
      this.filterItems();
    }
  }

  resetParams() {
    this.params = {
      style: null,
      type: null,
      page: 1
    };
    this.activeElements = {
      style: null,
      type: null
    };
  }
}