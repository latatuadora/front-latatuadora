import {BaseModal} from 'utils/base-modal';
import {bindable} from 'aurelia-framework';

export class TattooItem extends BaseModal {
  @bindable currentindex;
  @bindable tattoo;
  
  constructor() {
    super();
    let that = this;
    this.waitFor(function() {
      that.getInfo();
    });
  }
  
  getInfo() {
    this.image = this.tattoo.image.split('/');
  }
  
  waitFor(cb) {
    let that = this, timer;
    
    timer = setInterval(function() {
      if (that.tattoo !== null) {
        clearInterval(timer);
        cb();
      }
    });
  }
}
