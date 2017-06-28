import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';

@inject(AuthService)
export class Session {
  constructor(authService) {
    this.authService = authService;
    this.initUserType();
  }

  initUserType() {
    if (this.authService.isAuthenticated()) {
      let type = localStorage.getItem('latatuadora_com_usertype');
      if (type == null) {
        this.authService.logout('#/login');
      } else {
        this.setUserType(parseInt(type), false);
      }
    } else {
      this.setUserType(0);
    }
  }

  logout() {
    this.authService.logout('#/login');
    this.setUserType(0);
  }

  login(fields) {
    this.authService.login(fields)
      .then(response => {
        this.setUserType(response.usertype);
      });
  }

  setUserType(type, setInStorage = true) {
    this.userType = type;
    if (setInStorage) {
      localStorage.setItem('latatuadora_com_usertype', type);
    }
  }

  typeMatches(type, currentType = this.userType) {
    if (Array.isArray(type)) {
      return type.indexOf(currentType) != -1;
    } else {
      return currentType == type;
    }
  }
}