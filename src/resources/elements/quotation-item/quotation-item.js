import {bindable} from 'aurelia-framework';

export class QuotationItem {
  @bindable item;
  @bindable originalSize = true;
}