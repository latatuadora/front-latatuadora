import {inject, NewInstance} from 'aurelia-framework';
import {Validator, ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';
import {MockAPI} from 'utils/mock-api';
import {BaseModal} from 'utils/base-modal';

@inject(MockAPI, NewInstance.of(ValidationController), Validator)
export class Scheduling extends BaseModal {
  constructor(api, controller, validator) {
    super();
    this.api = api;
    this.controller = controller;
    this.validator = validator;

    this.artist = null;

    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    this.maxFileSize = 5 * 1024 * 1024;
    this.fileErrors = {
      type: false,
      size: false
    };

    this.fields = {
      date: new Date(),
      time: null,
      file: null,
      comment: ''
    };
  }

  activate(params, routeConfig) {
    this.getArtist(params.id);

    ValidationRules
      .ensure('comment')
      .maxLength(265)
      .withMessage('El mensaje no debe de exceder los 265 caracteres')
      .on(this.fields);
  }

  onLoaded = (file, data) => {
    this.fields.file = {file: file, data: data};
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

  getArtist(id) {
    this.api.getArtist(id)
      .then(artist => {
        this.artist = artist;
        this.fields.time = this.artist.schedules[0];
      });
  }

  setTime(time) {
    this.fields.time = time;
  }

  postRequest() {
  }
}