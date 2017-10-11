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
    this.listAwards = [];
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

  addAward() {
    document.getElementById('adwards').innerHTML += "<div><img class='content-absolute star-prize' src='src/assets/images/icons/lead-star.png' alt=''><input class='text-base adwardsInput text-white paragraph tattoo-artist-input-base width-100-mobile' placeholder='Escribe aquí...' type='text'></div>";
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

  getAwards() {
    let listAdwardsInput = [];
    let adwardsInput = document.getElementsByClassName('adwardsInput');
    for(var i = 0; i <= adwardsInput.length - 1; i++) {
      listAdwardsInput.push({award: adwardsInput[i].value});
    }
    return listAdwardsInput;
  }
  
  submit() {
    let data = new FormData();
    let listAdwards = this.getAwards();
    data.append("studio", this.dataUser.id);
    data.append("bio", this.currentArtist.bio);
    data.append("name", this.currentArtist.name);
    data.append("tattoos", this.checkedTattoos);
    data.append("awards", JSON.stringify(listAdwards));
    data.append("styles", JSON.stringify(this.styleList));
    data.append("image", document.querySelector('#upload-image').files[0]);
    this.api.add(data)
      .then(response => {
        this.session.setUser(this.dataUser.email);
        window.location.reload(true);
      })
      .catch(response => {
        this.error = response;
      });
  }
}
