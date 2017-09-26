import { autoinject, customAttribute } from 'aurelia-framework';

@autoinject
@customAttribute('hour')
export class HourCustomAttribute {

  static inject = [Element];

  constructor(element) {
    this.element = element;
    this.element.maxLength = 5;
    this.element.value = '08:00';
    this.element.addEventListener('input', this.validate.bind(this));
    this.element.addEventListener('copy', () => { event.preventDefault(); });
    this.element.addEventListener('paste', () => { event.preventDefault(); });
    this.element.addEventListener('drop', () => { event.preventDefault(); });
  }

  validate(event) {
    const validationHandler = new this.ValidateSchema(this.element);
    switch (this.element.value.replace(':', '').length) {
      case 1:
        validationHandler.one(event);
        break;
      case 2:
        validationHandler.two(event);
        break;
      case 3:
        validationHandler.three();
        break;
      case 4:
        validationHandler.four();
        break;
      default:
        validationHandler.default();
        break;
    }
  }

  ValidateSchema(element) {
    this.add = function(character, type) {
      if (element.value.length > 1 && type === 'insertText') {
        element.value += character;
      }
    };

    this.validate = function(REGEX) {
      element.value = REGEX.test(event.data) ? element.value : element.value.substring(0, element.value.length - 1);
    };

    this.one = function(event) {
      this.validate(new RegExp(/[0-2]/g));
    };

    this.two = function(event) {
      if (element.value.charAt(0) > 1) {
        this.validate(new RegExp(/[0-3]/g));
      } else {
        this.validate(new RegExp(/[0-9]/g));
      }

      this.add(':', event.inputType);
    };

    this.three = function() {
      this.validate(new RegExp(/[0-5]/g));
    };

    this.four = function() {
      this.validate(new RegExp(/[0-9]/g));
    };

    this.default = function() {
      element.value = element.value;
    };
  }
}
