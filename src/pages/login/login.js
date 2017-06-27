import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {Session} from 'utils/Session';

@inject(AuthService, Session)
export class Login {
  constructor(authService, session) {
    this.authService = authService;
    this.session = session;
    this.fields = {
      email: '',
      password: ''
    };
  }

  login() {
    return this.authService.login(this.fields)
      .then(response => {
        this.session.setUserType(response.usertype);
      })
      .catch(response => {
        console.log(response);
      });
  }
}
