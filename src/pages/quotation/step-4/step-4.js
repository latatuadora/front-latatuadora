import {inject, NewInstance} from 'aurelia-framework';
import {Validator, ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';

@inject(NewInstance.of(ValidationController), Validator)
export class Step4 {
  constructor(controller, validator) {
    this.controller = controller;
    this.validator = validator;
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    this.maxFileSize = 5 * 1024 * 1024;
    this.fileErrors = {
      type: false,
      size: false
    };
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

  isValid() {
    return this.controller.errors.length == 0;
  }
}