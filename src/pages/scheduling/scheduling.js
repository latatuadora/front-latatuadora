import {Session} from 'utils/session';
import {MockAPI} from 'utils/mock-api';
import { Router } from 'aurelia-router';
import {Studio} from 'controller/studio';
import {BaseModal} from 'utils/base-modal';
import {Schedule} from 'controller/schedule';
import {inject, NewInstance} from 'aurelia-framework';
import {Validator, ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';

@inject(MockAPI, NewInstance.of(ValidationController), Validator, Router, Studio, Session, Schedule)
export class Scheduling extends BaseModal {
  constructor(api, controller, validator, router, studio, session, schedule) {
    super();
    this.api = api;
    this.artist = null;
    this.router = router;
    this.studio = studio;
    this.session = session;
    this.validator = validator;
    this.schedule = schedule;
    this.controller = controller;
    //this.setRules();
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    this.fileErrors = {
      type: false,
      size: false
    };
    this.fields = {
      date: new Date(),
      file: null,
      comment: '',
      hour: null
    };

  }
  
  async attached() {
    this.client = await this.session.getCurrentUser();
    let id = this.router.currentInstruction.params.artist;
    this.artist = await this.studio.getDataUser({user: id})
    if (this.isFreelancer(this.artist)) {
      this.user = this.artist.freelancer;
    } else {
      this.user = this.artist.studio;
    }
    this.returnSchedules = [];
  }

  activate(params, routeConfig) {
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
  
  isFreelancer(result) {
    return result.userType.id === 4;
  }

  setTime(item) {
    this.fields.hour = item;
  }
  
  setRules() {
    ValidationRules
      .ensure('time').required().withMessage('*Debes elegir un horario')
      .on(this.fields);
  }
  
  getDate() {
    let date = this.fields.date[0];
    let time = this.fields.hour;
    let formatDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + time + ':00:00';
    return formatDate;
  }

  submit() {
    let date = this.getDate();
    let data = new FormData();
    let that = this;
    data.append("datetime", date);
    data.append("jobber", this.user.id);
    data.append("client", this.client.id);
    data.append("comment", this.fields.comment);
    data.append("image", document.querySelector('#photo-preview').files[0]);
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          this.schedule.schedule(data)
            .then(response => {
              that.openModal(1, 'confirm-scheduling-modal');
            })
            .catch(response => {
              this.error = response;
            });
        }
      });
  }
}
