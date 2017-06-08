import {inject, NewInstance} from 'aurelia-framework';
import {Validator, ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';

@inject(NewInstance.of(ValidationController), Validator)

export class Step5 {
  constructor(controller, validator) {
    this.controller = controller;
    this.validator = validator;
  }

  activate(model) {
    this.model = model;

    ValidationRules
      .ensure('email')
        .required()
        .withMessage('Introduce tu dirección de correo electrónico')
        .email()
        .withMessage('Debes introducir una dirección de correo válida')
      .ensure('name')
        .required()
        .withMessage('Introduce tu nombre')
      .ensure('phone')
        .required()
        .withMessage('Introduce tu número de teléfono')
        .matches(/^\d+$/)
        .withMessage('Introduce un número válido')
        .minLength(7)
        .withMessage('El número es demasiado corto')
      .ensure('city')
        .required()
        .withMessage('Introduce tu ciudad')
      .on(this.model.userData);
  }

  isValid() {
    return this.controller.validate()
      .then(validation => {
        return validation.valid;
      });
  }
}