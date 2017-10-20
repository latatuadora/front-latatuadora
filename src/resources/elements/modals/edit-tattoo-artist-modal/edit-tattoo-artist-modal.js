import {bindable} from 'aurelia-framework';
import {BaseModal} from 'utils/base-modal';
import {inject} from 'aurelia-framework';
import {Catalogs} from 'controller/catalogs';
import {Session} from 'utils/session';
import {Artist} from 'controller/artist';
import {Tattoo} from 'controller/tattoo';

@inject(Catalogs, Session, Artist, Tattoo)
export class EditTattooArtistModal extends BaseModal {
  @bindable artist;
  @bindable type = 'artist';
  @bindable vote;
  @bindable comment;
  @bindable goPrev;
  @bindable goNext;
  @bindable close;
  
  constructor(catalogs, session, api, tattoo) {
    super();
    this.api = api;
    this.styleList = [];
    this.awardsList = [];
    this.tattoo = tattoo;
    this.session = session;
    this.stylesToShow = [];
    this.currentArtist = {};
    this.catalogs = catalogs;
    this.user = this.session.getCurrentUser();
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
    document.getElementById('adwardsEdit-' + this.artist.id).innerHTML += "<div><img class='content-absolute star-prize' src='src/assets/images/icons/lead-star.png' alt=''><input class='text-base text-white paragraph tattoo-artist-input-base width-100-mobile' placeholder='Escribe aquí...' type='text'></div>";
    let adwardsInput = document.getElementById('adwardsEdit-' + this.artist.id);
    let inputNodes = adwardsInput.getElementsByTagName('INPUT');
    this.awardsList.push({award: ""});
    for(var i = 0; i < inputNodes.length; i++) {
      inputNodes[i].value = this.awardsList[i].award;
    }
  }
  
  async attached() {
    let that = this;
    this.styles = await this.catalogs.getCatalogStyles();
    this.tattoos = await this.tattoo.get(this.dataUser.id);
    this.currentArtist = await this.api.get(this.artist.id);
    if (this.currentArtist.styles) {
      this.currentArtist.styles.forEach(function(style) {
        that.stylesToShow.push({name: style.name, id: style.id});
        that.styleList.push({styleId: style.id});
      });
    }
    if (this.currentArtist.awards) {
      this.awardsList = this.currentArtist.awards;
    }
  }
  
  getAwards() {
    let listAdwardsInput = [];
    let adwardsInput = document.getElementById('adwardsEdit-' + this.artist.id);
    let inputNodes = adwardsInput.getElementsByTagName('INPUT');
    for(var i = 0; i <= inputNodes.length - 1; i++) {
      if (inputNodes[i].value !== '') {
        listAdwardsInput.push({award: inputNodes[i].value});
      }
    }
    return listAdwardsInput;
  }
  
  submit() {
    let data = new FormData();
    let listAdwards = this.getAwards();
    data.append("studio", this.dataUser.id);
    data.append("id", this.currentArtist.id);
    data.append("bio", this.currentArtist.bio);
    data.append("name", this.currentArtist.name);
    data.append("awards", JSON.stringify(listAdwards));
    data.append("styles", JSON.stringify(this.styleList));
    data.append("image", document.querySelector('#upload-image').files[0]);
    this.api.edit(data)
      .then(response => {
        this.session.setUser(this.user.email);
        window.location.reload();
      })
      .catch(response => {
        this.error = response;
      });
  }
}
