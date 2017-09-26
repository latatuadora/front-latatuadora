import {User} from 'controller/user';
import {Client} from '../../controller/client'
import {inject, NewInstance} from 'aurelia-framework';
import {ValidationRules, ValidationController, validateTrigger, Validator} from 'aurelia-validation';
@inject(NewInstance.of(ValidationController), Validator, User)
export default class Signup extends Client {
  user;
  type = false;
  styles = [];
  validator;
  controller;
  error;
  studioFreelance;
  
  constructor(controller, validator, api) {
    super();
    this.zones = [];
    this.registerFor = false;
    this.api = api;
    this.controller = controller;
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    this.validator = validator;
    this.stylesFromAPI = [];
    this.studioFreelance = {
      schedule: [],
      styles: [],
      form: '',//Type of selection checkbox
      name: '',
      email: '',
      password: '',
      confirm: '',
      state: '',
      suburb: '',
      town: '',
      telephone: '',
      certCofepris: '',
      about: ''
    };
  }
  
  attached() {
    let that = this;
    const file = document.getElementById('input:file');
    file.addEventListener('change', () => {
      this.file = file.files[0].name;
    });
    this.simplePetition('style', 'GET', function (success, error) {
      if (error !== null) {
        error.then(function (error) {
          throw new Error('Error when get styles says: ' + error);
        });
      } else {
        success.then(function (styles) {
          that.stylesFromAPI = styles;
        });
      }
    });
  }
  
  toggleStyle(style) {
    if (!this.searchIndexInObject({styleId: style.id}, this.studioFreelance.styles, style)) {
      style.active = true;
      this.studioFreelance.styles.push({styleId: style.id});
    }
  }
  
  searchIndexInObject(toSearch, arrayToSearch, style) {
    let result = false;
    let that = this;
    if (arrayToSearch.length > 0) {
      arrayToSearch.forEach(function (item, index) {
        if (item.styleId === toSearch.styleId) {
          style.active = false;
          arrayToSearch.splice(index, 1);
          that.studioFreelance.styles = arrayToSearch;
          result = true;
        }
      });
    } else {
      result = false;
    }
    return result;
  }
  
  submit() {
    let that = this;
    this.studioFreelance.certCofepris = this.certCofepris;
    this.studioFreelance.form = this.registerFor ? 'freelancer' : 'studio';
    this.studioFreelance.zones = [];
    this.zones.forEach(function (zone) {
      that.studioFreelance.zones.push({name: zone});
    });
    if (this.registerFor) {
      this.studioFreelance.canGoHome = this.canGoHome;
    }
    //Days
    if (this.monday) {
      this.studioFreelance.schedule.push({
        day: 1,
        start: that.mondayStartHour,
        end: that.mondayEndHour
      });
    }
    if (this.tuesday) {
      this.studioFreelance.schedule.push({
        day: 2,
        start: that.tuesdayStartHour,
        end: that.tuesdayEndHour
      });
    }
    if (this.wednesday) {
      this.studioFreelance.schedule.push({
        day: 3,
        start: that.wednesdayStartHour,
        end: that.wednesdayEndHour
      });
    }
    if (this.thursday) {
      this.studioFreelance.schedule.push({
        day: 4,
        start: that.thursdayStartHour,
        end: that.thursdayEndHour
      });
    }
    if (this.friday) {
      this.studioFreelance.schedule.push({
        day: 5,
        start: that.fridayStartHour,
        end: that.fridayEndHour
      });
    }
    if (this.saturday) {
      this.studioFreelance.schedule.push({
        day: 6,
        start: that.saturdayStartHour,
        end: that.saturdayEndHour
      });
    }
    if (this.sunday) {
      this.studioFreelance.schedule.push({
        day: 7,
        start: that.sundayStartHour,
        end: that.sundayEndHour
      });
    }
    //TODO add validations
    // this.controller.validate()
    //   .then(result => {
    //     if (result.valid) {
          this.api.signOn(this.studioFreelance)
            .then(response => {
              console.log(response, 'aaaaaaaaaaaaaaaaaaaaaaa')
              if (response.hasOwnProperty('name')) {
                this.error = response.message
              } else {
                this.api.signIn(this.studioFreelance.email, this.studioFreelance.password);
                this.api.userLogged(this.studioFreelance);
              }
            })
            .catch(response => {
              this.error = response
            })
      //   }
      // });
  }
}
