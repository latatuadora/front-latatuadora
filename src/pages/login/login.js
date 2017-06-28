import {inject} from 'aurelia-framework';
import {Session} from 'utils/session';

@inject(Session)
export class Login {
  constructor(session) {
    this.session = session;
    this.fields = {
      email: '',
      password: ''
    };
  }

  login() {
    this.session.authService.login(this.fields);
  }
}
