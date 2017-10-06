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
  }
  
  submit() {
    //TODO add 'ancho y alto' - Pending Back
    //TODO change name 'amountif', 'amountRecommended'
    let data = new FormData();
    data.append("sizeId", "2");
    data.append("styles", this.styleList);
    data.append("elements", this.elementList);
    data.append("artist", this.currentFlash.artist);
    data.append("amount", this.currentFlash.amount);
    data.append("amountif", this.currentFlash.amountif);
    data.append("copyright", this.currentFlash.copyright);
    data.append("significant", this.currentFlash.significant);
    data.append("amountRecommended", this.currentFlash.amountRecommended);
    data.append("sellImage", document.querySelector('#photo-preview').files[0]);
    data.append("realImage", document.querySelector('#photo-complete').files[0]);
    this.api.add(this.currentFlash)
      .then(response => {
        window.reload();
      })
      .catch(response => {
        this.error = response;
      });
  }
  
}
