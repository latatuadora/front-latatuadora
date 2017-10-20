import {bindable} from 'aurelia-framework';

export class MyQuotationItem {
	@bindable quotation;

  constructor () {
    console.log("Se muestra el item de cotización");
  }
}