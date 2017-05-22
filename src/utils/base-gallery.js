import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

@inject(MockAPI)
export class BaseGallery {
  constructor(api) {
    this.api = api;
    this.apiMethod = 'getItems';
    this.params = {
      style: '',
      element: '',
      page: 1
    }
    this.items = [];
    this.showLoader = false;
    this.showFilters = false;
  }

  activate(params, routeConfig) {
    if (params) {
      checkParams(params);
    }
    this.loadMore();
  }

  checkParams() {
    if (params.style) {
      this.params.style = params.style;
    }
    if (params.element) {
      this.params.element = params.element;
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  setStyle(style) {
    if (style !== this.params.style) {
      this.params.style = style;
      this.filterItems();
    }
  }

  setElement(element) {
    if (element !== this.params.element) {
      this.params.element = element;
      this.filterItems();
    }
  }

  resetParams() {
    this.params = {
      style: '',
      element: '',
      page: 1
    }
  }

  resetFilters() {
    this.resetParams();
    this.filterItems();
  }

  filterItems() {
    this.items = [];
    this.params.page = 1;
    this.showLoader = true;
    this.__masonry_grid__.resetCols();

    this.showLoader = false;
    this.loadMore();
  }

  loadMore() {
    if (!this.showLoader) {
      this.showLoader = true;
      this.api[this.apiMethod](this.params, this.params.page)
        .then(items => {
          items.forEach(item => {
            this.items.push(item);
          });
          this.showLoader = false;
          this.params.page += 1;
        });
    }
  }
}