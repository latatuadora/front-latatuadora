import {BaseModal} from 'utils/base-modal';
import {bindable} from 'aurelia-framework';

export class FlashItem extends BaseModal {
  @bindable currentindex;
  
  constructor() {
  	super();
    this.flash = {
    	precio: '3000'
    };
  }
}
