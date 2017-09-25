import {Quotation} from 'controller/quotation';
import {inject} from 'aurelia-framework';

@inject(Quotation)
export class MyQuotations {
  constructor (api) {
    this.api = api;
    this.quotations = ["Mis", "cotizaciones"];
    this.getQuotationsUser();
  }

  getQuotationsUser() {
    this.api.quotation()
      .then(response => {
        this.userQuotations = response;
      })
      .catch(response => {
        this.error = response
      })
  }
}