import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';

@inject(AuthService)
export class Session {
  constructor(auth) {
    this.initUserType(auth);
  }

  initUserType(auth) {
    if (auth.isAuthenticated()) {
      console.log('authenticated');
      let type = localStorage.getItem('latatuadora_com_usertype');
      if (type == null) {
        auth.logout('#/login');
      } else {
        this.setUserType(parseInt(type), false);
      }
    } else {
      this.setUserType(0);
      console.log('not authenticated');
    }
  }

  setUserType(type, setInStorage = true) {
    this.userType = type;
    if (setInStorage) {
      localStorage.setItem('latatuadora_com_usertype', type);
    }
  }

  typeMatches(type) {
    if (Array.isArray(type)) {
      return type.indexOf(this.userType) != -1;
    } else {
      return this.userType == type;
    }
  }
}