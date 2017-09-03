import {User} from 'controller/user';
import {inject, NewInstance} from 'aurelia-framework';
import {ValidationRules, ValidationController, validateTrigger, Validator} from 'aurelia-validation';

@inject(NewInstance.of(ValidationController), Validator, User)
export class UserSignup {

  user;
  validator;
  controller;
  error;

  constructor(controller, validator, api) {
    this.api = api;
    this.controller = controller
    this.controller.validateTrigger = validateTrigger.changeOrBlur
    this.validator = validator

    console.log(api)

    this.user = {
      form: 'user',
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirm: ''
    }

    ValidationRules.customRule('equals', (value, obj, property) =>
      value === null
      || value === undefined
      || value === ''
      || obj[property] === null
      || obj[property] === undefined
      || obj[property] === ''
      || value === obj[property],
      '*Las contraseñas deben de ser iguales',
      property => ({ property })
    )

    ValidationRules
      .ensure((m: user) => m.name).required().withMessage('*Debes introducir tu nombre')
      .ensure((m: user) => m.lastName).required().withMessage('*Debes introducir tus apellidos')
      .ensure((m: user) => m.email).required().withMessage('*Debes introducir tu dirección de correo electronico').email().withMessage('*Debes introducir una dirección de correo válida')
      .ensure((m: user) => m.password).required().withMessage('*Debes de introducir una contraseña').minLength(6).withMessage('*La contraseña debe de tener al menos 6 caracteres')
      .ensure((m: user) => m.confirm).required().withMessage('*Debes confirmar tu contraseña').satisfiesRule('equals', 'password')
      .on(this.user)

  }

  submit() {
    this.controller.validate()
      .then(result => {

        if(result.valid) {
          this.api.signOn(this.user)
            .then(response => {
          
              response.name.toUpperCase() === 'ERROR'
                            ? this.error = response.message
                            : this.api.signIn(this.user.email, this.user.password);

            })
            .catch(response => {
              this.error = response
            })
        }

      });
  }

}
