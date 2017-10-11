import {Client} from './client';
import {AuthService} from 'aurelia-authentication';
import {inject, computedFrom} from 'aurelia-framework';
import {json} from 'aurelia-fetch-client';
import {Session} from 'utils/session';
import {Catalogs} from 'controller/catalogs';
@inject(AuthService, Session, Catalogs)
export class User extends Client {
  /**
   *@PUBLIC constructor
   *@DESCRIPTION define endpoint
   **/
  constructor(AuthService, Session, Catalogs) {
    super();
    this.authService = AuthService;
    this.session = Session;
    this.catalogs = Catalogs;
  }
  
  // make a getter to get the authentication status.
  // use computedFrom to avoid dirty checking
  @computedFrom('authService.authenticated')
  get authenticated() {
    return this.authService.authenticated;
  }
  
  /**
   *@PUBLIC signIn
   *@DESCRIPTION open session
   **/
  signIn(email, password) {
    var that = this;
    localStorage.setItem('email', email);
    //return this.authService.login({email: email, password:password}, {}, '#/dashboard');
    return this.authService.login(email, password, {}, '#/dashboard').then(function(role) {
      that.session.setUser(email);
      that.catalogs.getInitialData();
      switch (role.usertype) {
        case 2:
          that.session.setRole(1, true);
          break;
        case 4:
          that.session.setRole(2, true);
          break;
        case 3:
          that.session.setRole(3, true);
          break;
        default:
          break;
      }
    });
  }
  
  userLogged(user) {
    delete user.password;
    delete user.confirm;
    this.session.setUser(user.email);
  }
  
  /**
   *@PUBLIC signOn
   *@DESCRIPTION register a user on the plataform
   **/
  signOn(data) {
    const url = 'logup';
    return this.client
      .fetch(`${url}`, {
        method: this.methods.post,
        body: json(data)
      })
      .then(response => response.json())
      .then(user => {
        return user
      })
      .catch(error => {
        return error
      })
  }
  
  /**
   *@PUBLIC signOff
   *@DESCRIPTION close session
   **/
  signOff() {
    return this.authService.logout();
  }
}
