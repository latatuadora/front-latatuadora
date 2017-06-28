import {inject, NewInstance} from 'aurelia-framework';
import {Validator, ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';
import {Session} from 'utils/session';

@inject(NewInstance.of(ValidationController), Validator, Session)
export class Login {
  constructor(controller, validator, session) {
    this.controller = controller;
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    this.validator = validator;
    this.session = session;
    this.fields = {
      email: '',
      password: ''
    };
    this.showLoaders = {
      social: false,
      form: false
    };
    this.badRequests = {
      social: false,
      form: false
    };
    this.setRules();
  }

  setRules() {
    ValidationRules
      .ensure('email')
      .required()
      .withMessage('Introduce tu dirección de correo electrónico')
      .email()
      .withMessage('Debes introducir una dirección de correo válida')
      .ensure('password')
      .required()
      .withMessage('Introduce tu contraseña')
      .minLength(6)
      .withMessage('La contraseña debe de tener al menos 6 caracteres')
      .on(this.fields);
  }

  login() {
    this.showLoaders.form = true;
    this.controller.validate()
      .then(validation => {
        if (validation.valid) {
          this.session.authService.login(this.fields)
            .catch(() => {
              this.badRequests.form = true;
              this.showLoaders.form = false;
            });
        }
      });
  }
}
