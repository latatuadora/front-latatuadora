import {inject} from 'aurelia-framework';
import {Session} from 'utils/session';
import {Validator, ValidationRules, ValidationControllerFactory, validateTrigger} from 'aurelia-validation';
import {Studio} from 'controller/studio';
@inject(ValidationControllerFactory, Validator, Session, Studio)
export class Edit {
  constructor(controllerFactory, validator, session, api) {
    this.session = session;
    this.dataController = controllerFactory.create();
    this.passwordsController = controllerFactory.create();
    this.dataController.validateTrigger = validateTrigger.changeOrBlur;
    this.passwordsController.validateTrigger = validateTrigger.changeOrBlur;
    this.validator = validator;
    this.api = api;
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
      tattooed: false,
      image: '/src/assets/images/mock/avatar.png'
    };
    this.passwords = {
      current: '',
      new: '',
      confirm: ''
    };
    this.showModal = false;
    this.addRules();
  }
  
  addRules() {
    ValidationRules.customRule('matchesTo', (value, obj, propertyName) => {
      return (!value && !obj[propertyName]) ||
        value == obj[propertyName];
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
    if (error === 'File type does not match filter') {
      this.fileErrors.type = true;
    } else {
      this.fileErrors.size = true;
    }
  }
  
  updateData() {
    this.dataController.validate()
      .then(validation => {
        if (validation.valid) {
          console.log('PUT Request');
          this.showModal = true;
        }
      });
  }
  
  updatePassword() {
    this.passwordsController.validate()
      .then(validation => {
        if (validation.valid) {
          console.log('PUT Request', 'password');
          this.showModal = true;
        }
      });
  }
  
  attached() {
    let email = localStorage.getItem('email');
    let that = this;
    async function getUser() {
      let user = await that.api.getDataUser({ email: email });
      localStorage.setItem('latatuadora_currentUser', JSON.stringify(user));
      that.userData.username = user.name;
      that.userData.name = user.name + ' ' + (user.lastname ? user.lastname !== null : '');
      that.userData.email = user.email;
      that.userData.phone = user.telephone;
      that.userData.tattooed = user.tattooed;
    };
    getUser();
  }
}
