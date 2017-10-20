import {inject, NewInstance} from 'aurelia-framework';
import {User} from 'controller/user';
import {Validator, ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';
import {Session} from 'utils/session';
import {BaseModal} from 'utils/base-modal';
import {AuthService} from 'aurelia-authentication';

@inject(NewInstance.of(ValidationController), Validator, Session, User)
export class Login extends BaseModal {
  constructor(controller, validator, session, api) {
    super();
    this.api = api;
    this.controller = controller;
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    this.validator = validator;
    this.session = session;
    this.fields = {
      email: '',
      password: ''
    };
    this.rememberMe = false;
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

  submit() {
    this.controller.validate()
      .then(result => {

        if(result.valid) {
          this.api.signIn(this.fields.email, this.fields.password)
        }

      });
  }


}
