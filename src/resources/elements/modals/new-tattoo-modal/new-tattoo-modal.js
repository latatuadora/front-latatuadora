import {bindable} from 'aurelia-framework';
import {BaseModal} from 'utils/base-modal';
import {inject} from 'aurelia-framework';
import {Catalogs} from 'controller/catalogs';
import {Session} from 'utils/session';
import {Tattoo} from 'controller/tattoo';

@inject(Catalogs, Session, Tattoo)
export class newTattooModal extends BaseModal {
  @bindable flash;
  @bindable type = 'tattoo';
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
    this.user = this.session.getCurrentUser();
    this.currentTatto = {};
    this.styleList = [];
    this.stylesToShow = [];
    this.elementList = [];
    this.elementsToShow = [];
    // TODO Change for de endpoint elements - Pending Back
    this.elements = [
      { id: 1, name: 'Element 1'},
      { id: 2, name: 'Element 2'},
      { id: 3, name: 'Element 3'},
      { id: 4, name: 'Element 4'},
      { id: 5, name: 'Element 5'}
    ];
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
  
  attached() {
    this.styles = this.catalogs.getStyles();
    this.bodyParts = this.catalogs.getBodyPart();
  }
  
  submit() {
    //TODO Change artist and for endpoint - Pending Back
    this.currentTatto.artist = 1;
    this.currentTatto.styles = this.styleList;
    this.currentTatto.elements = this.elementList;
    var formData = new FormData();
    formData.append('image', document.querySelector('#photo-preview'));
    this.currentTatto.image = formData;
    this.api.add(this.currentTatto)
      .then(response => {
        window.reload();
      })
      .catch(response => {
        this.error = response;
      });
  }

}
