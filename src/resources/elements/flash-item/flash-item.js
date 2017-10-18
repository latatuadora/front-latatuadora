import {BaseModal} from 'utils/base-modal';
import {bindable} from 'aurelia-framework';

export class FlashItem extends BaseModal {
  @bindable currentindex;
  @bindable flash;
  
  constructor() {
  	super();
  	//TODO replace with the back send complete data
    let that = this;
    this.flash = {
      width: '12',
      height: '12',
      likes: '13'
    };
    this.waitFor(function() {
      that.getInfo();
    });
  }
  
  getInfo() {
    this.image = this.flash.realImageUrl.split('/');
  }
  
  waitFor(cb) {
    let that = this, timer;
    
    timer = setInterval(function() {
      if (that.flash !== null) {
        clearInterval(timer);
        cb();
      }
    });
  }
}
