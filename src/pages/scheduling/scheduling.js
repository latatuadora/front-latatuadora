import {inject, NewInstance} from 'aurelia-framework';
import {Validator, ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';
import {MockAPI} from 'utils/mock-api';

@inject(MockAPI, NewInstance.of(ValidationController), Validator)
export class Scheduling {
  constructor(api, controller, validator) {
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
  }

  activate(params, routeConfig) {
    this.getArtist(params.id);
  }

  getArtist(id) {
    this.api.getArtist(id)
      .then(artist => {
        this.artist = artist;
      });
  }
}