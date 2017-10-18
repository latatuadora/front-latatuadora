import {bindable} from 'aurelia-framework';
import {BaseModal} from 'utils/base-modal';
import {inject} from 'aurelia-framework';
import {Catalogs} from 'controller/catalogs';
import {Session} from 'utils/session';
import {Flash} from 'controller/flash';
import {Artist} from 'controller/artist';

@inject(Catalogs, Session, Flash, Artist)
export class newFlashModal extends BaseModal {
  @bindable flash;
  @bindable type = 'flash';
  @bindable vote;
  @bindable comment;
  @bindable goPrev;
  @bindable goNext;
  @bindable close;
  
  constructor(catalogs, session, api, artist) {
    super();
    this.api = api;
    this.artist = artist;
    this.session = session;
    this.catalogs = catalogs;
    this.currentFlash = {
      copyright: false
    };
    this.styleList = [];
    this.elementList = [];
    this.stylesToShow = [];
    this.elementsToShow = [];
    this.shared = {
      height: 10,
      width: 10,
      changeHeight: (height) => {this.shared.height = height;},
      changeWidth: (width) => {this.shared.width = width;}
    };
  }
  
  toggleAll() {
    this.currentFlash.copyrigth = true;
  }
  
  //TODO try to create element for this select
  saveRemoveStyles(element, name) {
    if (!this.searchIndexInObject({style: element.id}, this.styleList, this.stylesToShow, name)) {
      this.styleList.push({ style: element.id });
      this.stylesToShow.push({ name: element.name, id: element.id });
    }
  }
  
  saveRemoveElements(element, name) {
    if (!this.searchIndexInObject({element: element.id}, this.elementList, this.elementsToShow, name)) {
      this.elementList.push({ element: element.id });
      this.elementsToShow.push({ name: element.name, id: element.id });
    }
  }
  
  searchIndexInObject(toSearch, arrayToSearch, arrayToShow, name) {
    let result = false;
    let that = this;
    if (arrayToSearch.length > 0) {
      arrayToSearch.forEach(function(item, index) {
        if (name === 'style') {
          if (item.style === toSearch.style) {
            arrayToSearch.splice(index, 1);
            arrayToShow.splice(index, 1);
            result = true;
          }
        } else if (name === 'element') {
          if (item.element === toSearch.element) {
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
    this.styles = await this.catalogs.getCatalogStyles();
    this.elements = await this.catalogs.getCatalogElements();
    let dataUser = this.session.getStudioFreelancer();
    this.artists = await this.artist.getArtists(dataUser.id);
  }
  
  submit() {
    let data = new FormData();
    data.append("dimensionsX", this.shared.width);
    data.append("dimensionsY", this.shared.height);
    data.append("artist", this.currentFlash.artist);
    data.append("styleId", JSON.stringify(this.styleList));
    data.append("copyrigth", this.currentFlash.copyrigth);
    data.append("elementId", JSON.stringify(this.elementList));
    data.append("significant", this.currentFlash.significant);
    data.append("final_price", parseFloat(this.currentFlash.final_price));
    data.append("price_with_jobber", parseFloat(this.currentFlash.price_with_jobber));
    data.append("sellImage", document.querySelector('#photo-preview').files[0]);
    data.append("realImage", document.querySelector('#photo-complete').files[0]);
    this.api.add(data)
      .then(response => {
        window.location.reload();
      })
      .catch(response => {
        this.error = response;
      });
  }
}
