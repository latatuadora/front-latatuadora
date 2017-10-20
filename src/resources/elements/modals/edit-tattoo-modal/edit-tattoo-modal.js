import {bindable} from 'aurelia-framework';
import {BaseModal} from 'utils/base-modal';
import {inject, NewInstance} from 'aurelia-framework';
import {Catalogs} from 'controller/catalogs';
import {Session} from 'utils/session';
import {Tattoo} from 'controller/tattoo';
import {ValidationRules, ValidationController, validateTrigger, Validator} from 'aurelia-validation';

@inject(Catalogs, Session, Tattoo, NewInstance.of(ValidationController), Validator)
export class EditTattooModal extends BaseModal {
  @bindable tattoo;
  @bindable type = 'tattoo';
  @bindable vote;
  @bindable comment;
  @bindable goPrev;
  @bindable goNext;
  @bindable close;
  
  constructor(catalogs, session, api, controller, validator) {
    super();
    this.api = api;
    this.styleList = [];
    this.elementList = [];
    this.stylesToShow = [];
    this.currentTatto = {
      styles: [],
      elements: []
    };
    this.session = session;
    this.catalogs = catalogs;
    this.elementsToShow = [];
    this.validator = validator;
    this.controller = controller;
    this.user = this.session.getCurrentUser();
    this.setRules();
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    this.productMatcher = (a, b) => a.id === b.id;
  }
  
  saveRemoveStyles(element, name) {
    if (!this.searchIndexInObject({styleId: element.id}, this.styleList, this.stylesToShow, name)) {
      this.styleList.push({ styleId: element.id });
      this.stylesToShow.push({ name: element.name, id: element.id });
    }
  }
  
  saveRemoveElements(element, name) {
    if (!this.searchIndexInObject({elementId: element.id}, this.elementList, this.elementsToShow, name)) {
      this.elementList.push({ elementId: element.id });
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
  
  async attached() {
    let that = this;
    this.styles = await this.catalogs.getCatalogStyles();
    this.elements = await this.catalogs.getCatalogElements();
    this.bodyParts = await this.catalogs.getCatalogBodyPart();
    this.artists = this.session.getStudioFreelancer().artist;
    this.currentTatto = await this.api.getTattoo(this.tattoo.id);
    this.currentTatto.styles.forEach(function(style) {
      that.stylesToShow.push({name: style.name, id: style.id});
      that.styleList.push({ styleId: style.id });
    });
    this.currentTatto.elements.forEach(function(element) {
      that.elementsToShow.push({name: element.name, id: element.id});
      that.elementList.push({ elementId: element.id });
    });
  }
  
  setRules() {
    console.log('kakak');
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
    data.append("artist", this.currentTatto.artist.id);
    data.append("partbody", this.currentTatto.partbody.id);
    data.append("styles", JSON.stringify(this.currentTatto.styles));
    data.append("elements", JSON.stringify(this.currentTatto.elements));
    data.append("dimensionsX", parseFloat(this.currentTatto.dimensionsX));
    data.append("dimensionsY", parseFloat(this.currentTatto.dimensionsY));
    data.append("image", document.querySelector('#photo-preview').files[0]);
    this.controller.validate()
      .then(result => {
        console.log(result);
        if (result.valid) {
          this.api.edit(data, this.currentTatto.id)
            .then(response => {
              //window.location.reload();
            })
            .catch(response => {
              this.error = response;
            });
        }
      });
  }
}
