import {inject} from 'aurelia-framework';
import {Studio} from 'controller/studio';
import {Catalogs} from 'controller/catalogs';
import {BaseGallery} from 'utils/base-gallery';
import {WebAPI} from 'utils/web-api';

@inject(WebAPI, Studio, Catalogs)
export class SearchArtist extends BaseGallery {
  constructor(api, studio, catalogs) {
    super(api);
    this.studio = studio;
    this.catalogs = catalogs;
    this.params = {
      style: undefined,
      type: undefined,
      neighborhood: undefined,
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
  
  async attached() {
    this.artists = await this.studio.getUserAll(this.params);
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
  
  async getStyles() {
    let that = this;
    this.lists.styles = await this.catalogs.getCatalogStyles();
    this.lists.styles.forEach(function(style) {
      if (that.params.style === style.id) {
        that.activeElements.style = style;
      }
    });
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
      this.activeElements.type = this.lists.types[0];
    } else if (this.params.type == this.lists.types[1].id) {
      this.activeElements.type = this.lists.types[1];
    }
  }
  
  async filter(params) {
    if (params.type === 1) {
      params.type = 4;
      this.artists = await this.studio.getUserAll(params);
    } else if (params.type === 0) {
      params.type = 3;
      this.artists = await this.studio.getUserAll(params);
    } else {
      this.artists = await this.studio.getUserAll(params);
    }
  }
  
  setStyle = style => {
    if (style.id !== this.params.style) {
      this.params.style = style.id;
      this.activeElements.style = style;
      this.filter(this.params);
    }
  };
  
  setType = type => {
    if (type.id !== this.params.type) {
      this.params.type = type.id;
      this.activeElements.type = type;
      this.filter(this.params);
    }
  };
  
  setNeighborhood(neighborhood) {
    this.params.neighborhood = neighborhood;
    this.filter(this.params);
  }
  
  async resetFilters() {
    this.params = {
      style: undefined,
      type: undefined,
      neighborhood: undefined,
      page: 1
    };
    this.artists = await this.studio.getUserAll(this.params);
  }
}
