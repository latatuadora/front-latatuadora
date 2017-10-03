import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Studio} from 'controller/studio';

@inject(AuthService, EventAggregator, Studio)

export class Session {
  constructor(authService, eventAgreggator, api) {
    this.authService = authService;
    this.eventAgreggator = eventAgreggator;
    this.initRole();
    this.setListener();
    this.api = api;
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
    localStorage.clear();
    this.authService.logout('#/login');
  }
  
  login(fields) {
    this.authService.login(fields);
  }
  
  setUser(email) {
    let that = this;
    async function getUser() {
      let currentUser = await that.api.getDataUser({ email: email });
      localStorage.setItem('latatuadora_currentUser', JSON.stringify(currentUser));
    }
    getUser();
  }
  
  getCurrentUser() {
    let that = this;
    let email = localStorage.getItem('email');
    let currentUser = localStorage.getItem('latatuadora_currentUser');
    if(currentUser) {
      return JSON.parse(currentUser);
    } else {
      async function getUser() {
        let currentUser = await that.api.getDataUser({ email: email });
        localStorage.setItem('latatuadora_currentUser', JSON.stringify(currentUser));
        return JSON.parse(currentUser);
      }
      getUser();
    }
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
