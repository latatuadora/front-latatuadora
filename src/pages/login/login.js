import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';

@inject(AuthService)
export class Login {
  constructor(authService) {
    this.authService = authService;
    this.fields = {
      email: '',
      password: ''
    };
  }

  login() {
    return this.authService.login(this.fields)
      .then(response => {
        console.log(response);
      })
      .catch(response => {
        console.log(response);
      });
  }
}
