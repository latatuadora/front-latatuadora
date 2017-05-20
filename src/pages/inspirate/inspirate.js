import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

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
    this.loadMore();
  }

  filterTattoos() {
    this.page = 1;
    this.tattoos = [];
    this.loadMore();
  }

  loadMore() {
    this.showLoader = true;
    this.api.getTattoos(this.filters, this.page)
      .then(tattoos => {
        tattoos.forEach(tattoo => {
          this.tattoos.push(tattoo);
          this.showLoader = false;
        });
      });
  }
}