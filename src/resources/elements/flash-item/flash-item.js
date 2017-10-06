import {BaseModal} from 'utils/base-modal';
import {bindable} from 'aurelia-framework';

export class FlashItem extends BaseModal {
  @bindable currentindex;
  @bindable flash;
  
  constructor() {
  	super();
  	//TODO replace with the back send complete data
    this.flash = {
      width: '12',
      height: '12',
      likes: '13'
    };
  }
}
