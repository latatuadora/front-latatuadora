import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {Menu} from 'utils/menu';
import {Session} from 'utils/session';
@inject(Router, Session)
export class Navbar {
  constructor(router, session) {
    this.router = router;
    this.session = session;
  }
  
  attached() {
    let menu = new Menu(975);
    let currentUser = this.session.getCurrentUser();
    currentUser.avatar = '/src/assets/images/icons/avatar.svg';
    this.currentUser = currentUser;
  }
}
