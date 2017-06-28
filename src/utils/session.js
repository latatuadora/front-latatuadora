import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';

@inject(AuthService)
export class Session {
  constructor(authService) {
    this.authService = authService;
    this.initRole();
  }

  initRole() {
    if (this.authService.isAuthenticated()) {
      let role = localStorage.getItem('latatuadora_com_role');
      if (role == null) {
        this.authService.logout('#/login');
      } else {
        this.setRole(parseInt(role), false);
      }
    } else {
      this.setRole(0);
    }
  }

  logout() {
    this.authService.logout('#/login');
    this.setRole(0);
  }

  login(fields) {
    this.authService.login(fields)
      .then(response => {
        this.setRole(response.usertype);
      })
      .catch(response => {
        console.log(response);
      });
  }

  setRole(role, setInStorage = true) {
    this.role = role;
    if (setInStorage) {
      localStorage.setItem('latatuadora_com_role', role);
    }
  }

  isAllowed(allowedRoles, currentRole = this.role) {
    return allowedRoles.indexOf(currentRole) != -1
  }
}