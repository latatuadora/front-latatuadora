import {bindable} from 'aurelia-framework';
import {BaseModal} from 'utils/base-modal';
import {inject, NewInstance} from 'aurelia-framework';
import {Catalogs} from 'controller/catalogs';
import {Session} from 'utils/session';
import {Tattoo} from 'controller/tattoo';
import {ValidationRules, ValidationController, validateTrigger, Validator} from 'aurelia-validation';

@inject(Catalogs, Session, Tattoo, NewInstance.of(ValidationController), Validator)
export class newTattooModal extends BaseModal {
  @bindable flash;
  @bindable type = 'tattoo';
  @bindable vote;
  @bindable comment;
  @bindable goPrev;
  @bindable goNext;
  @bindable close;

  constructor(catalogs, session, api, controller, validator) {
    super();
    this.api = api;
    this.stylesList = [];
    this.elementsList = [];
    this.stylesToShow = [];
    this.currentTatto = {
      styles: [],
      elements: []
    };
    this.session = session;
    this.elementsToShow = [];
    this.catalogs = catalogs;
    this.validator = validator;
    this.controller = controller;
    this.user = this.session.getCurrentUser();
    this.setRules();
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
  }
  
  saveRemoveStyles(element, name) {
    if (!this.searchIndexInObject({styleId: element.id}, this.stylesList, this.stylesToShow, name)) {
      this.stylesList.push({ styleId: element.id });
      this.stylesToShow.push({ name: element.name, id: element.id });
    }
  }
  
  saveRemoveElements(element, name) {
    if (!this.searchIndexInObject({elementId: element.id}, this.elementsList, this.elementsToShow, name)) {
      this.elementsList.push({ elementId: element.id });
      this.elementsToShow.push({ name: element.name, id: element.id });
    }
  }
  
  searchIndexInObject(toSearch, arrayToSearch, arrayToShow, name) {
    let result = false;
    let that = this;
    if (arrayToSearch.length > 0) {
      arrayToSearch.forEach(function(item, index) {
        if (name === 'style') {
          if (item.styleId === toSearch.styleId) {
            arrayToSearch.splice(index, 1);
            arrayToShow.splice(index, 1);
            result = true;
          }
        } else if (name === 'element') {
          if (item.elementId === toSearch.elementId) {
            arrayToSearch.splice(index, 1);
            arrayToShow.splice(index, 1);
            result = true;
          }
        }
      });
    } else {
      result = false;
    }
    return result;
  }
  
  attached() {
    this.styles = this.catalogs.getCatalogStyles();
    this.elements = this.catalogs.getCatalogElements();
    this.bodyParts = this.catalogs.getCatalogBodyPart();
    this.artists = this.session.getStudioFreelancer().artist;
  }
  
  setRules() {
    ValidationRules.customRule('iterator', (value, obj) =>
      value === null
      || value === undefined
      || value === ''
      || value.length > 0,
      '*Debes de escoger al menos una opción'
    );
    ValidationRules
      .ensure('styles').satisfiesRule('iterator')
      .ensure('elements').satisfiesRule('iterator')
      .ensure('name').required().withMessage('*Debes introducir un nombre')
      .ensure('dimensionsY').required().withMessage('*Debes introducir un alto')
      .ensure('dimensionsX').required().withMessage('*Debes introducir un ancho')
      .on(this.currentTatto);
  }
  
  submit() {
    let data = new FormData();
    this.currentTatto.styles = this.stylesList;
    this.currentTatto.elements = this.elementsList;
    data.append("name", this.currentTatto.name);
    data.append("artist", this.currentTatto.artist);
    data.append("partbody", this.currentTatto.partbody);
    data.append("styles", JSON.stringify(this.currentTatto.styles));
    data.append("elements", JSON.stringify(this.currentTatto.elements));
    data.append("dimensionsX", parseFloat(this.currentTatto.dimensionsX));
    data.append("dimensionsY", parseFloat(this.currentTatto.dimensionsY));
    data.append("image", document.querySelector('#photo-preview').files[0]);
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          this.api.add(data)
            .then(response => {
              window.location.reload();
            })
            .catch(response => {
              this.error = response;
            });
        }
      });
  }
}
