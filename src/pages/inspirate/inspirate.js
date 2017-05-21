import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';
import masonry from 'masonry-layout';

@inject(MockAPI)
export class Inspirate {
  constructor(api, router) {
    this.api = api;
    this.params = {
      style: '',
      element: '',
      part: '',
      page: 1
    }
    this.tattoos = [];
    this.showLoader = false;
    this.grid = {};
    this.showFilters = false;
  }

  activate(params, routeConfig) {
    if (params) {
      if (params.style) {
        this.params.style = params.style;
      }
      if (params.element) {
        this.params.element = params.element;
      }
      if (params.part) {
        this.params.part = params.part;
      }
    }
    this.loadMore();
  }

  bind() {
    this.grid = new masonry(this.tattoosGrid);
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  appendItem(item) {
    this.grid.appended(item);
  }

  removeItem(item) {
    this.grid.remove(item);
  }

  setStyle(style) {
    if (style !== this.params.style) {
      this.params.style = style;
      this.filterTattoos();
    }
  }

  setElement(element) {
    if (element !== this.params.element) {
      this.params.element = element;
      this.filterTattoos();
    }
  }

  setBodyPart(part) {
    if (part !== this.params.part) {
      this.params.part = part;
      this.filterTattoos();
    }
  }

  resetFilters() {
    this.params = {
      style: '',
      element: '',
      part: '',
      page: 1
    }
    this.filterTattoos();
  }

  filterTattoos() {
    this.tattoos = [];
    this.params.page = 1;
    this.showLoader = true;

    for (let i = 0; i < this.grid.colYs.length; i++) {
      this.grid.colYs[i] = 0;
    }
    this.tattoosGrid.style.height = 0;
    this.grid.maxY = 0;

    this.showLoader = false;
    this.loadMore();
  }

  loadMore() {
    if (!this.showLoader) {
      this.showLoader = true;
      this.api.getTattoos(this.params, this.params.page)
        .then(tattoos => {
          tattoos.forEach(tattoo => {
            this.tattoos.push(tattoo);
          });
          this.showLoader = false;
          this.params.page += 1;
        });
    }
  }
}