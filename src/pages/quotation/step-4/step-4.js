import {inject, NewInstance} from 'aurelia-framework';
import {Validator, ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';

@inject(NewInstance.of(ValidationController), Validator)
export class Step4 {
  self = {};

  constructor(controller, validator) {
    this.controller = controller;
    this.validator = validator;
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    this.maxFileSize = 5 * 1024 * 1024;
    this.fileValidations = [true, true];
    self = this;
  }

  activate(model) {
    this.model = model;

    ValidationRules
      .ensure('additionalComment')
      .maxLength(265)
      .withMessage('El mensaje no debe de exceder los 265 caracteres')
      .on(this.model);
  }

  onLoaded(file, data) {
    self.model.changeFile(file, data);
  }

  onError(file, error) {
    console.log(error);
  }

  isValid() {
    let messageValid = this.controller.results.length == 0;
    let validFile = this.fileValidations[0] && this.fileValidations[1];
    return messageValid && validFile;
  }
}