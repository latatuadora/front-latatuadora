import {User} from 'controller/user';
import {Client} from '../../controller/client';
import {inject, NewInstance} from 'aurelia-framework';
import {ValidationRules, ValidationController, validateTrigger, Validator} from 'aurelia-validation';
@inject(NewInstance.of(ValidationController), Validator, User)
export default class Signup extends Client {
  user;
  type = false;
  styles = [];
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
    this.days = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    };
    this.studioFreelance = {
      schedule: [],
      styles: [],
      form: '',
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      state: '',
      suburb: '',
      town: '',
      telephone: '',
      about: '',
      street: '',
      external: '',
      internal: '',
      days: this.days,
      canGoHome: '',
      certCofepris: '',
      zones: []
    };
    this.setRules();
  }
  
  attached() {
    let that = this;
    const file = document.getElementById('input:file');
    file.addEventListener('change', () => {
      this.file = file.files[0].name;
    });
    this.simplePetition('style', 'GET', null).then(styles => {
        that.stylesFromAPI = styles;
    }).catch(error => {
      throw new Error('Error when get styles says: ' + error);
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

  setRules() {
    ValidationRules.customRule('iterator', (value, obj) =>
      value === null
    || value === undefined
    || value === ''
    || Symbol.iterator in Object(value) && value.length > 0
    || typeof value[Symbol.iterator] === 'function' && value.length > 0,
      '*Debes de escoger al menos una opción'
  );

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
    );

    ValidationRules.customRule('truthy', (value, obj) =>
      value === null
      || value === undefined
      || value === ''
      || Object.values(value).reduce((items, item) => items || item ),
      '*Debes de asignar al menos un dia de trabajo'
    );

    ValidationRules
      .ensure('name').required().withMessage('*Debes introducir tu nombre')
      .ensure('email').required().withMessage('*Debes introducir tu dirección de correo electronico').email().withMessage('*Debes introducir una dirección de correo válida')
      .ensure('telephone').required().withMessage('*Debes introducir tu telefono').minLength(6).withMessage('*Debes de intruducir un telefono valido')
      .ensure('password').required().withMessage('*Debes de introducir una contraseña').minLength(6).withMessage('*La contraseña debe de tener al menos 6 caracteres')
      .ensure('passwordConfirm').required().withMessage('*Debes confirmar tu contraseña').satisfiesRule('equals', 'password')
      .ensure('street').required().withMessage('*Debes introducir tu calle')
      .ensure('numExt').required().withMessage('*Debes introducir tu numero exterior')
      .ensure('numInt').required().withMessage('*Debes introducir tu numero interior')
      .ensure('state').required().withMessage('*Debes introducir tu estado')
      .ensure('suburb').required().withMessage('*Debes introducir tu delegacion / municipio')
      .ensure('town').required().withMessage('*Debes introducir tu colonia')
      .ensure('about').required().withMessage('*Debes de intruducir al menos 144 caracteres').minLength(144).withMessage('*Debes de intruducir al menos 144 caracteres')
      .ensure('styles').satisfiesRule('iterator')
      .ensure('days').satisfiesRule('truthy')
      .ensure('zones').satisfiesRule('iterator')
      .ensure('certCofepris').required().withMessage('*Debes elegir una opción')
      .ensure('canGoHome').required().withMessage('*Debes elegir una opción')
      .on(this.studioFreelance);
  }

  submit() {
    let that = this;
    this.studioFreelance.form = this.registerFor ? 'freelancer' : 'studio';
    if (this.studioFreelance.days.monday) {
      this.studioFreelance.schedule.push({
        dayId: 1,
        start: that.mondayStartHour,
        end: that.mondayEndHour
      });
    }
    if (this.studioFreelance.days.tuesday) {
      this.studioFreelance.schedule.push({
        dayId: 2,
        start: that.tuesdayStartHour,
        end: that.tuesdayEndHour
      });
    }
    if (this.studioFreelance.days.wednesday) {
      this.studioFreelance.schedule.push({
        dayId: 3,
        start: that.wednesdayStartHour,
        end: that.wednesdayEndHour
      });
    }
    if (this.studioFreelance.days.thursday) {
      this.studioFreelance.schedule.push({
        dayId: 4,
        start: that.thursdayStartHour,
        end: that.thursdayEndHour
      });
    }
    if (this.studioFreelance.days.friday) {
      this.studioFreelance.schedule.push({
        dayId: 5,
        start: that.fridayStartHour,
        end: that.fridayEndHour
      });
    }
    if (this.studioFreelance.days.saturday) {
      this.studioFreelance.schedule.push({
        dayId: 6,
        start: that.saturdayStartHour,
        end: that.saturdayEndHour
      });
    }
    if (this.studioFreelance.days.sunday) {
      this.studioFreelance.schedule.push({
        dayId: 7,
        start: that.sundayStartHour,
        end: that.sundayEndHour
      });
    }


    //Days
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          let sendData = this.studioFreelance;
          delete sendData.days;
          this.api.signOn(sendData)
            .then(response => {
              if (response.hasOwnProperty('name')) {
                this.error = response.message;
              } else {
                this.api.signIn(this.studioFreelance.email, this.studioFreelance.password);
                this.api.userLogged(this.studioFreelance);
              }
            })
            .catch(response => {
              this.error = response;
            });
        }
      });
  }
}
