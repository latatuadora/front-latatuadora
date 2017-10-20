import {BaseModal} from 'utils/base-modal';
import {Tattoo} from 'controller/tattoo';
import {inject} from 'aurelia-framework';
import {Session} from 'utils/session';

@inject( Tattoo, Session)
export class MyTatoos extends BaseModal {
  constructor(tattoo, session) {
    super();
    this.title = ["Mis", "tatuajes"];
    this.newtattoo = "agregar nuevo tatuaje";
    this.tattoo = tattoo;
    this.session = session;
    this.dataUser = this.session.getStudioFreelancer();
  }
  
  attached() {
    let that = this;
    this.tattoo.get(this.dataUser.id)
      .then(response => {
        that.tattoos = response;
      })
      .catch(error => {
        this.error = response;
      });
  }
}
