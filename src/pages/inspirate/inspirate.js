import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

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

  toggleFilters() {
    this.showFilters = !this.showFilters;
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
    this.__masonry_grid__.resetCols();

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