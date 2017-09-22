import {Client} from './client'
import {AuthService} from 'aurelia-authentication';
import {inject, computedFrom} from 'aurelia-framework';
import {json} from 'aurelia-fetch-client';
import {Session} from 'utils/session';

@inject(AuthService, Session)
export class User extends Client {
  
  /**
   *@PUBLIC constructor
   *@DESCRIPTION define endpoint
   **/
  constructor(AuthService, Session) {
    super();
    this.authService = AuthService;
    this.session = Session;
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
    //return this.authService.login({email: email, password:password}, {}, '#/dashboard');
    return this.authService.login(email, password, {}, '#/dashboard').then(function (role) {
      switch (role.usertype) {
        case 2:
          that.session.setRole(1, true);
          break;
        default:
          break;
      }
    });
  }
  
  userLogged(user) {
    delete user.password;
    delete user.confirm;
    this.session.setUser(user);
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
