import {BaseModal} from 'utils/base-modal';
import {bindable} from 'aurelia-framework';

export class ArtistTattooItem extends BaseModal {
  @bindable currentindex;
  @bindable artist;
  
  constructor() {
    super();
  }
}
