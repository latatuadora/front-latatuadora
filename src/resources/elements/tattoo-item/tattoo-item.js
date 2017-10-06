import {BaseModal} from 'utils/base-modal';
import {bindable} from 'aurelia-framework';

export class TattooItem extends BaseModal {
  @bindable currentindex;
  @bindable tattoo;
  
  constructor() {
    super();
  }
}
