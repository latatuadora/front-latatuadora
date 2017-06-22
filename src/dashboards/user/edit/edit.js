import {inject, NewInstance} from 'aurelia-framework';
import {Validator, ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';

@inject(NewInstance.of(ValidationController), Validator)
export class Edit {
  constructor(controller, validator) {
    this.controller = controller;
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    this.validator = validator;

    this.maxFileSize = 5 * 1024 * 1024;
    this.fileErrors = {
      type: false,
      size: false
    };
    this.userData = {
      username: '',
      name: '',
      email: '',
      phone: '',
      image: '/src/assets/images/mock/avatar.png'
    };
    this.passwords = {
      current: '',
      new: '',
      confirm: ''
    };
    this.userData.file = null;
    this.addRules();
  }

  addRules() {
    ValidationRules.customRule('matchesTo', (value, obj, propertyName) => {
      return !value || value == obj[propertyName];
    }, 'Los valores no coinciden');

    ValidationRules
      .ensure('username')
        .required()
        .withMessage('Introduce un nombre de usuario')
      .ensure('name')
        .required()
        .withMessage('Introduce tu nombre')
      .ensure('email')
        .required()
        .withMessage('Introduce tu dirección de correo electrónico')
        .email()
        .withMessage('Debes introducir una dirección de correo válida')
      .ensure('phone')
          .required()
          .withMessage('Introduce tu número de teléfono')
          .matches(/^\d+$/)
          .withMessage('Introduce un número válido')
          .matches(/^.{8,10}$/)
          .withMessage('El número debe contener entre 8 y 10 dígitos')
      .on(this.userData)
      .ensure('new')
        .required()
        .withMessage('Introduce una contraseña')
        .minLength(6)
        .withMessage('La contraseña debe de contener al menos 6 catacteres')
      .ensure('confirm')
        .satisfiesRule('matchesTo', 'new')
      .on(this.passwords);
  }

  onLoaded = (file, data) => {
    this.userData.file = {
      file: file,
      data: data
    };
    this.fileErrors.type = false;
    this.fileErrors.size = false;
  }

  onError = (file, error) => {
    if (error == 'File type does not match filter') {
      this.fileErrors.type = true;
    } else {
      this.fileErrors.size = true;
    }
  }
}