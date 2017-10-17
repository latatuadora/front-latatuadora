import {Quotation} from 'controller/quotation';
import {inject} from 'aurelia-framework';
import {Session} from 'utils/session';

@inject(Quotation, Session)
export class MyQuotations {
  constructor(api, session) {
    this.api = api;
    this.session = session;
    this.quotations = ["Mis", "cotizaciones"];
    this.getQuotationsUser();
  }

  getQuotationsUser() {
    this.api.getQuotation()
      .then(response => {
        this.userQuotations = response;
      })
      .catch(response => {
        this.error = response
      });
  }
  
  attached() {
    let user = this.session.getCurrentUser();
  }
  
}
