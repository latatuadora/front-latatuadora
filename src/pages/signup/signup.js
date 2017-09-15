import {User} from 'controller/user';
import {inject, NewInstance} from 'aurelia-framework';
import {ValidationRules, ValidationController, validateTrigger, Validator} from 'aurelia-validation';

@inject(NewInstance.of(ValidationController), Validator, User)
export default class Signup {

  user;
  type = false;
  styles = [];
  validator;
  controller;
  error;

  tags = [
    {id: 1,  name: 'Old School', imgUrl: '/src/assets/images/mock/style14.jpg' },
    {id: 2,  name: 'New School', imgUrl: '/src/assets/images/mock/style15.jpg' },
    {id: 3,  name: 'Puntillismo', imgUrl: '/src/assets/images/mock/style10.png' },
    {id: 4,  name: 'Geometrico', imgUrl: '/src/assets/images/mock/style9.png' },
    {id: 5,  name: 'Trash Polka', imgUrl: '/src/assets/images/mock/style7.png' },
    {id: 6,  name: 'Black work', imgUrl: '/src/assets/images/mock/style1.png' },
    {id: 7,  name: 'Acuarela', imgUrl: '/src/assets/images/mock/style13.png' },
    {id: 8,  name: 'Japones', imgUrl: '/src/assets/images/mock/style13.png' },
    {id: 9,  name: 'Tribal', imgUrl: '/src/assets/images/mock/style16.jpg' },
    {id: 10, name: 'Caligrafia', imgUrl: '/src/assets/images/mock/style11.png' },
    {id: 11, name: 'Ilustracion', imgUrl: '/src/assets/images/mock/style12.png' },
    {id: 12, name: 'Surreal', imgUrl: '/src/assets/images/mock/style6.png' },
    {id: 13, name: 'Biomecanico', imgUrl: '/src/assets/images/mock/style8.png' }
  ];

  constructor(controller, validator, api) {
    this.api = api;
    this.controller = controller
    this.controller.validateTrigger = validateTrigger.changeOrBlur
    this.validator = validator
  }

  attached() {
    const file = document.getElementById('input:file');
    file.addEventListener('change', () => {
      this.file = file.files[0].name;
    });
  }

  submit() {
    console.log(this.styles)
  }
}
