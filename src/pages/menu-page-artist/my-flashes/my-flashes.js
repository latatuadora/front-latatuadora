import {BaseModal} from 'utils/base-modal';
import {Flash} from 'controller/flash';
import {inject} from 'aurelia-framework';
import {Session} from 'utils/session';

@inject( Flash, Session)
export class MyFlashes extends BaseModal{
  constructor(flash, session) {
    super();
    this.flash = flash;
    this.session = session;
    this.title = ["Mis", "flashes"];
    this.dataUser = this.session.getStudioFreelancer();
  }
  
  attached() {
    let that = this;
    this.flash.get(this.dataUser.id)
      .then(response => {
        that.flashes = response;
      })
      .catch(error => {
        this.error = response;
      });
  }
}
