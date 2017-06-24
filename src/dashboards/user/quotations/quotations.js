import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

@inject(MockAPI)
export class Quotations {
  constructor(api) {
    this.api = api;
    this.params = {
      id: 1,
      page: 1
    };
    this.quotations = [];
    this.showLoader = false;
    this.loadMore();
  }

  loadMore() {
    if (!this.showLoader) {
      this.showLoader = true;
      this.api.getQuotations(this.params)
        .then(quotations => {
          quotations.forEach(quotation => {
            this.quotations.push(quotation);
          });
          this.showLoader = false;
          this.params.page += 1;
        });
    }
  }
}