import {Session} from 'utils/session';
import {inject, NewInstance} from 'aurelia-framework';
import {Artist} from 'controller/artist';
import {Tattoo} from 'controller/tattoo';
import {bindable} from 'aurelia-framework';
import {BaseModal} from 'utils/base-modal';
import {Catalogs} from 'controller/catalogs';
import {ValidationRules, ValidationController, validateTrigger, Validator} from 'aurelia-validation';

@inject(Catalogs, Session, Artist, Tattoo, NewInstance.of(ValidationController), Validator)
export class NewTattooArtistModal extends BaseModal {
  @bindable flash;
  @bindable type = 'artist';
  @bindable vote;
  @bindable comment;
  @bindable goPrev;
  @bindable goNext;
  @bindable close;
  
  constructor(catalogs, session, api, tattoo, controller, validator) {
    super();
    this.api = api;
    this.styleList = [];
    this.tattoo = tattoo;
    this.session = session;
    this.stylesToShow = [];
    this.catalogs = catalogs;
    this.currentArtist = {
      styles: [],
      awards: []
    };
    this.validator = validator;
    this.controller = controller;
    this.dataUser = this.session.getStudioFreelancer();
    this.setRules();
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
  }

  saveRemoveStyles(element, name) {
    if (!this.searchIndexInObject({styleId: element.id}, this.styleList, this.stylesToShow, name)) {
      this.styleList.push({ styleId: element.id });
      this.stylesToShow.push({ name: element.name, id: element.id });
    }
  }
  
  searchIndexInObject(toSearch, arrayToSearch, arrayToShow, name) {
    let result = false;
    let that = this;
    if (arrayToSearch.length > 0) {
      arrayToSearch.forEach(function(item, index) {
        if (item.styleId === toSearch.styleId) {
          arrayToSearch.splice(index, 1);
          arrayToShow.splice(index, 1);
          result = true;
        }
      });
    } else {
      result = false;
    }
    return result;
  }

  addAward() {
    document.getElementById('adwards').innerHTML += "<div><img class='content-absolute star-prize' src='src/assets/images/icons/lead-star.png' alt=''><input class='text-base adwardsInput text-white paragraph tattoo-artist-input-base width-100-mobile' placeholder='Escribe aquí...' type='text'></div>";
  }
  
  attached() {
    this.styles = this.catalogs.getCatalogStyles();
  }

  getAwards() {
    let listAdwardsInput = [];
    let adwardsInput = document.getElementsByClassName('adwardsInput');
    for (var i = 0; i <= adwardsInput.length - 1; i++) {
      if (adwardsInput[i].value !== '') {
        listAdwardsInput.push({award: adwardsInput[i].value});
      }
    }
    return listAdwardsInput;
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
      .ensure('name').required().withMessage('*Debes introducir un nombre')
      .ensure('bio').required().withMessage('*Debes introducir una descripción')
      .on(this.currentArtist);
  }
  
  submit() {
    let data = new FormData();
    let listAdwards = this.getAwards();
    this.currentArtist.awards = listAdwards;
    this.currentArtist.styles = this.styleList;
    data.append("studio", this.dataUser.id);
    data.append("bio", this.currentArtist.bio);
    data.append("name", this.currentArtist.name);
    data.append("awards", JSON.stringify(this.currentArtist.awards));
    data.append("styles", JSON.stringify(this.currentArtist.styles));
    data.append("image", document.querySelector('#upload-image').files[0]);
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
