import {BaseModal} from 'utils/base-modal';
import {bindable} from 'aurelia-framework';

export class TattooItem extends BaseModal {
  @bindable currentindex;
  @bindable tattoo;
  
  constructor() {
    super();
    let that = this;
    let timer = setInterval(function() {
      if (that.tattoo !== null) {
        if (that.tattoo.image) {
          that.image = that.tattoo.image.split('/');
        }
        clearInterval(timer);
      }
    });
  }
}
