import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';
import masonry from 'masonry-layout';

@inject(MockAPI)
export class Inspirate {
  constructor(api) {
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
  }

  bind() {
    this.grid = new masonry(this.tattoosGrid);
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

  removeItem(item) {
    this.grid.remove(item);
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

  appendItem(item) {
    this.grid.appended(item);
    this.grid.reloadItems();
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

  activate(params, routeConfig) {
    let previousParams = {
      style: this.params.style,
      element: this.params.element,
      part: this.params.part,
      page: this.params.page
    };
    if (params) {
      if (params.style) {
        this.params.style = params.style;
      }
      if (params.element) {
        this.params.element = params.element;
      }
      if (params.element) {
        this.params.part = params.part;
      }
    }
    this.loadMore();
  }
}