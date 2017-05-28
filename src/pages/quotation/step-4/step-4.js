import {inject, NewInstance} from 'aurelia-framework';
import {Validator, ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';

@inject(NewInstance.of(ValidationController), Validator)
export class Step4 {
  constructor(controller, validator) {
    this.controller = controller;
    this.validator = validator;
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    this.maxFileSize = 5 * 1024 * 1024;
    this.fileValidations = [true, true];
  }

  activate(model) {
    this.model = model;

    ValidationRules
      .ensure('additionalComment')
      .maxLength(265)
      .withMessage('El mensaje no debe de exceder los 265 caracteres')
      .on(this.model);
  }

  onLoaded = (file, data) => {
    this.model.changeFile(file, data);
    this.fileValidations = [true, true];
  }

  onError = (file, error) => {
    if (error == 'File type does not match filter') {
      this.fileValidations[0] = false;
    } else {
      this.fileValidations[1] = false;
    }
  }

  isValid() {
    let messageValid = this.controller.results.length == 0;
    let validFile = this.fileValidations[0] && this.fileValidations[1];
    return messageValid && validFile;
  }
}