import {BaseModal} from 'utils/base-modal';
import {bindable} from 'aurelia-framework';

export class ArtistTattooItem extends BaseModal {
  @bindable currentindex;
  @bindable artist;
  
  constructor() {
    super();
    let that = this;
    let timer = setInterval(function() {
      if (that.artist !== null) {
        if (that.artist.avatarUrl) {
          that.image = that.artist.avatarUrl.split('/');
        }
        clearInterval(timer);
      }
    });
  }
}
