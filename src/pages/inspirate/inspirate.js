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

    this.loadMore();
  }

  bind() {
    this.grid = new masonry(this.tattoosGrid);
  }

  filterTattoos() {
    this.params.page = 1;
    this.tattoos = [];
    this.loadMore();
  }

  appendItem(item) {
    this.grid.appended(item);
  }

  loadMore() {
    if (!this.showLoader) {
      this.showLoader = true;
      this.api.getTattoos(this.filters, this.params.page)
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