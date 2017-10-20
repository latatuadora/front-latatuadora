import {BaseModal} from 'utils/base-modal';
import {Session} from 'utils/session';
import {inject} from 'aurelia-framework';
import {Artist} from 'controller/artist';

@inject(Session, Artist)
export class MyTattooArtist extends BaseModal {
  constructor(session, api) {
    super();
    this.session = session;
    this.api = api;
    this.artistTitle = ["Mis", "tatuadores"];
    this.dataUser = this.session.getStudioFreelancer();
  }
  
  attached() {
    let that = this;
    this.api.getArtists(this.dataUser.id)
      .then(response => {
        that.artists = response;
      })
      .catch(error => {
        this.error = response;
      });
  }
}
