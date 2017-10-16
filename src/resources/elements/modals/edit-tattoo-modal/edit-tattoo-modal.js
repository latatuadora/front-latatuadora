import {bindable} from 'aurelia-framework';
import {BaseModal} from 'utils/base-modal';
import {inject} from 'aurelia-framework';
import {Catalogs} from 'controller/catalogs';
import {Session} from 'utils/session';
import {Tattoo} from 'controller/tattoo';

@inject(Catalogs, Session, Tattoo)
export class EditTattooModal extends BaseModal {
  @bindable tattoo;
  @bindable type = 'tattoo';
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
    this.currentTatto = {};
    this.session = session;
    this.catalogs = catalogs;
    this.elementsToShow = [];
    this.user = this.session.getCurrentUser();
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
    this.styles = await this.catalogs.getStyles();
    this.elements = await this.catalogs.getElements();
    this.bodyParts = await this.catalogs.getBodyPart();
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
  
  submit() {
    let data = new FormData();
    data.append("name", this.currentTatto.name);
    data.append("artist", this.currentTatto.artist.id);
    data.append("partbody", this.currentTatto.partbody.id);
    data.append("styles", JSON.stringify(this.styleList));
    data.append("elements", JSON.stringify(this.elementList));
    data.append("dimensionsX", this.currentTatto.dimensionsX);
    data.append("dimensionsY", this.currentTatto.dimensionsY);
    data.append("image", document.querySelector('#photo-preview').files[0]);
    this.api.edit(data, this.currentTatto.id)
      .then(response => {
        window.location.reload();
      })
      .catch(response => {
        this.error = response;
      });
  }
}
