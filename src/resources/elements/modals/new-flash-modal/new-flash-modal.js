import {bindable} from 'aurelia-framework';
import {BaseModal} from 'utils/base-modal';
import {inject} from 'aurelia-framework';
import {Catalogs} from 'controller/catalogs';
import {Session} from 'utils/session';
import {Flash} from 'controller/flash';

@inject(Catalogs, Session, Flash)
export class newFlashModal extends BaseModal {
  @bindable flash;
  @bindable type = 'flash';
  @bindable vote;
  @bindable comment;
  @bindable goPrev;
  @bindable goNext;
  @bindable close;
  
  constructor(catalogs, session, api) {
    super();
    this.catalogs = catalogs;
    this.session = session;
    this.api = api;
    this.user = this.session.getStudioFreelancer();
    this.currentFlash = {
      copyright: false
    };
    this.styleList = [];
    this.stylesToShow = [];
    this.elementList = [];
    this.elementsToShow = [];
    this.shared = {
      height: 10,
      width: 10,
      changeHeight: (height) => {this.shared.height = height;},
      changeWidth: (width) => {this.shared.width = width;}
    };
    //TODO Change for de endpoint elements - Pending Back
    this.elements = [
      { id: 1, name: 'Element 1'},
      { id: 2, name: 'Element 2'},
      { id: 3, name: 'Element 3'},
      { id: 4, name: 'Element 4'},
      { id: 5, name: 'Element 5'}
    ];
  }
  
  toggleAll() {
    this.currentFlash.copyright = true;
  }
  
  //TODO try to create element for this select
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
  
  attached() {
    this.styles = this.catalogs.getStyles();
    this.bodyParts = this.catalogs.getBodyPart();
  }
  
  submit() {
    //TODO Change artist for selection - Front add 'Agregar tatuador al estudio'
    this.currentFlash.artist = 1;
    this.currentFlash.styles = this.styleList;
    this.currentFlash.elements = this.elementList;
    this.currentFlash.sizeId = 2;
    var formData = new FormData();
    formData.append('image', document.querySelector('#photo-preview'));
    this.currentFlash.sellImage = formData;
    formData.append('image', document.querySelector('#photo-complete'));
    this.currentFlash.realImage = formData;
    this.api.add(this.currentFlash)
      .then(response => {
        window.reload();
      })
      .catch(response => {
        this.error = response;
      });
  }
  
}
