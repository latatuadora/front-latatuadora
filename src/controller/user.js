import { Client } from './client'
import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';

@inject(AuthService)
export class User extends Client{

  /**
  *@PUBLIC constructor
  *@DESCRIPTION define endpoint
  **/
  constructor(authService) {
    super()
    this.authService = authService
    this.authenticated = false
  }

  /**
  *@PUBLIC signIn
  *@DESCRIPTION open session
  **/
  signIn(credentials) {

    return this.authService.login(credentials)
      .then(() => {
        this.authenticated = this.authService.authenticated;
      })

  }

  /**
  *@PUBLIC signOn
  *@DESCRIPTION register a user on the plataform
  **/
  signOn(data) {

    const url = 'logup'

    this.client
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
    return this.user = undefined
  }

}
