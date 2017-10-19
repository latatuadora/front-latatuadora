import {BaseModal} from 'utils/base-modal';
import {bindable} from 'aurelia-framework';

export class ArtistTattooItem extends BaseModal {
  @bindable currentindex;
  @bindable artist;
  
  constructor() {
    super();
    let that = this;
    this.waitFor(function() {
      that.getInfo();
    });
  }
  
  getInfo() {
    this.image = this.artist.avatarUrl.split('/');
  }
  
  waitFor(cb) {
    let that = this, timer;
    
    timer = setInterval(function() {
      if (that.artist !== null) {
        clearInterval(timer);
        cb();
      }
    });
  }
}
