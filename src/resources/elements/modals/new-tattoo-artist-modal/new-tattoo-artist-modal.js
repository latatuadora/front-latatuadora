import {bindable} from 'aurelia-framework';
import {BaseModal} from 'utils/base-modal';
import {inject} from 'aurelia-framework';
import {Catalogs} from 'controller/catalogs';
import {Session} from 'utils/session';
import {Artist} from 'controller/artist';
import {Tattoo} from 'controller/tattoo';

@inject(Catalogs, Session, Artist, Tattoo)
export class NewTattooArtistModal extends BaseModal {
  @bindable flash;
  @bindable type = 'artist';
  @bindable vote;
  @bindable comment;
  @bindable goPrev;
  @bindable goNext;
  @bindable close;
  
  constructor(catalogs, session, api, tattoo) {
    super();
    this.api = api;
    this.tattoo = tattoo;
    this.session = session;
    this.catalogs = catalogs;
    this.currentArtist = {};
    this.styleList = [];
    this.stylesToShow = [];
    this.checkedTattoos = [];
    this.dataUser = this.session.getStudioFreelancer();
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
  
  attached() {
    this.styles = this.catalogs.getStyles();
    let that = this;
    this.tattoo.get(this.dataUser.id)
      .then(response => {
        that.tattoos = response;
      })
      .catch(error => {
        this.error = response;
      });
  }
  
  submit() {
    let tattoos = [];
    let data = new FormData();
    this.checkedTattoos.forEach(function(element) {
      tattoos.push({tattooId: element});
    });
    data.append("studio", this.dataUser.id);
    data.append("bio", this.currentArtist.bio);
    data.append("name", this.currentArtist.name);
    //TODO uncomment when back receive this data
    /*data.append("awards", JSON.stringify(this.awards));
    data.append("styles", JSON.stringify(this.styleList));
    data.append("tattoos", JSON.stringify(tattoos));
    data.append("image", document.querySelector('#upload-image').files[0]);*/
    this.api.add(this.currentArtist)
      .then(response => {
        window.reload();
      })
      .catch(response => {
        this.error = response;
      });
  }
  
}
