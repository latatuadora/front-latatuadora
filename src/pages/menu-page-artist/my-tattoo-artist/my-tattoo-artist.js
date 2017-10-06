import {BaseModal} from 'utils/base-modal';
import {Session} from 'utils/session';
import {inject} from 'aurelia-framework';

@inject(Session)
export class MyTattooArtist extends BaseModal {
  constructor(session) {
    super();
    this.session = session;
    this.artist = ["Mis", "tatuadores"];
  }
  
  attached() {
    this.user = this.session.getStudioFreelancer();
  }
}
