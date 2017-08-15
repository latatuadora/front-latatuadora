import { Client } from './client'

export class User extends Client{

  /**
  *@PUBLIC constructor
  *@DESCRIPTION define endpoint
  **/
  constructor() {
    super()
  }

  /**
  *@PUBLIC signIn
  *@DESCRIPTION open session
  **/
  signIn(credentials) {

    const url = 'login'

    this.client
      .fetch(`${url}`, {
        method: this.methods.post,
        body: json(credentials)
      })
      .then(response => response.json())
      .then(auth => {
        return this.user.auth = auth
      })
      .catch(error => {
        return error
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
