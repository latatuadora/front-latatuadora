import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {Menu} from 'utils/menu';
import {Session} from 'utils/session';

@inject(Router, Session)
export class Navbar {
  constructor(router, session) {
    this.router = router;
    this.session = session;
    this.intervalId = 0;
  }
  
  attached() {
    let that = this;
    this.intervalId = setInterval(function() {
      let role = that.session.getRole();
      if (role !== 0) {
        let currentUser = that.session.getCurrentUser();
        if (currentUser) {
          if (currentUser !== 'No existe tal usuario') {
            currentUser.avatar = '/src/assets/images/icons/avatar.svg';
            that.currentUser = currentUser;
          }
          clearInterval(that.intervalId);
        }
      }
    });
  }
}
