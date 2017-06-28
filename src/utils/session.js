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
        this.logout();
      } else {
        this.setRole(parseInt(role), false);
      }
    } else {
      this.setRole(0);
    }
  }

  logout() {
    this.setRole(0);
    this.authService.logout('#/login');
  }

  login(fields) {
    this.authService.login(fields);
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