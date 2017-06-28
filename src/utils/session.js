import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(AuthService, EventAggregator)
export class Session {
  constructor(authService, eventAgreggator) {
    this.authService = authService;
    this.eventAgreggator = eventAgreggator;
    this.initRole();
    this.setListener();
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

  setListener() {
    this.eventAgreggator.subscribe('authentication-change', authenticated => {
      if (!authenticated) {
        this.setRole(0);
      }
    });
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