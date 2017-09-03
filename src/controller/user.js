import { Client } from './client'
import {AuthService} from 'aurelia-authentication';
import {inject, computedFrom} from 'aurelia-framework';
import {json} from 'aurelia-fetch-client';

@inject(AuthService)
export class User extends Client{

  /**
  *@PUBLIC constructor
  *@DESCRIPTION define endpoint
  **/
  constructor(AuthService) {
    super()
    this.authService = AuthService
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
    return this.authService.login({email: email, password},{},'#/dashboard');
  }

  /**
  *@PUBLIC signOn
  *@DESCRIPTION register a user on the plataform
  **/
  signOn(data) {

    const url = 'logup'

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
