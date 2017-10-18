import {bindable} from 'aurelia-framework';
import {BaseModal} from 'utils/base-modal';
import {inject} from 'aurelia-framework';
import {Catalogs} from 'controller/catalogs';
import {Session} from 'utils/session';
import {Flash} from 'controller/flash';

@inject(Catalogs, Session, Flash)
export class EditFlashModal extends BaseModal {
  @bindable flash;
  @bindable type = 'flash';
  @bindable vote;
  @bindable comment;
  @bindable goPrev;
  @bindable goNext;
  @bindable close;
  
  constructor(catalogs, session, api) {
    super();
    this.api = api;
    this.styleList = [];
    this.elementList = [];
    this.stylesToShow = [];
    this.session = session;
    this.elementsToShow = [];
    this.catalogs = catalogs;
    this.currentFlash = { copyright: false };
    this.shared = {
      height: 10,
      width: 10,
      changeHeight: (height) => {this.shared.height = height;},
      changeWidth: (width) => {this.shared.width = width;}
    };
    this.user = this.session.getStudioFreelancer();
  }
  
  toggleAll() {
    this.currentFlash.copyrigth = true;
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
  
  async attached() {
    let that = this;
    this.styles = await this.catalogs.getCatalogStyles();
    this.elements = await this.catalogs.getCatalogElements();
    this.currentFlash = await this.api.getFlah(this.flash.id);
    this.currentFlash.styles.forEach(function(style) {
      if (style !== null) {
        that.stylesToShow.push({name: style.name, id: style.id});
        that.styleList.push({styleId: style.id});
      }
    });
    this.currentFlash.elements.forEach(function(element) {
      if (element !== null) {
        that.elementsToShow.push({name: element.name, id: element.id});
        that.elementList.push({elementId: element.id});
      }
    });
  }
  
  submit() {
    let data = new FormData();
    data.append("id", this.currentFlash.id);
    data.append("dimensionsX", this.shared.width);
    data.append("dimensionsY", this.shared.height);
    data.append("artist", this.currentFlash.artist.id);
    data.append("styles", JSON.stringify(this.styleList));
    data.append("copyrigth", this.currentFlash.copyrigth);
    data.append("elements", JSON.stringify(this.elementList));
    data.append("significant", this.currentFlash.significant);
    data.append("final_price", parseFloat(this.currentFlash.final_price));
    data.append("price_with_jobber", parseFloat(this.currentFlash.price_with_jobber));
    data.append("sellImage", document.querySelector('#photo-preview').files[0]);
    data.append("realImage", document.querySelector('#photo-complete').files[0]);
    this.api.edit(data)
      .then(response => {
        window.location.reload();
      })
      .catch(response => {
        this.error = response;
      });
  }
}
