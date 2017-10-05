import {BaseModal} from 'utils/base-modal';
import {Session} from 'utils/session';
import {inject} from 'aurelia-framework';
import {Client} from '../../controller/client';
import {Studio} from 'controller/studio';
import {Tattoo} from 'controller/tattoo';
import {Flash} from 'controller/flash';

@inject(Session, Studio, Client, Tattoo, Flash)
export class EditProfile extends BaseModal {
  constructor(session, api, client, tattoo, flash) {
    super();
    this.api = api;
    this.client = client;
    this.session = session;
    this.tattoo = tattoo;
    this.flash = flash;
    this.registerFor = false;
    this.dataUser = this.session.getCurrentUser();
    this.dataStudioFree = this.session.getStudioFreelancer();
    this.editProfile = {
      titleWhite: 'Mi',
      titleGold: 'Perfil'
    };
    this.currentUser = {
      styles: [],
      schedule: []
    };
  }

  toggleStyle(style) {
    if (!this.searchIndexInObject({styleId: style.id}, this.currentUser.styles, style)) {
      style.active = true;
      this.currentUser.styles.push({styleId: style.id});
    }
  }

  searchIndexInObject(toSearch, arrayToSearch, style) {
    let result = false;
    let that = this;
    if (arrayToSearch.length > 0) {
      arrayToSearch.forEach(function(item, index) {
        if (item.styleId === toSearch.styleId) {
          style.active = false;
          arrayToSearch.splice(index, 1);
          that.currentUser.styles = arrayToSearch;
          result = true;
        }
      });
    } else {
      result = false;
    }
    return result;
  }

  submit() {
    let that = this;
    this.currentUser.form = this.registerFor ? 'freelancer' : 'studio';
    this.currentUser.user = this.dataUser.id;
    this.currentUser.studio = this.dataStudioFree.id;
    if (this.monday) {
      this.currentUser.schedule.push({
        day: 1,
        start: that.mondayStartHour,
        end: that.mondayEndHour
      });
    }
    if (this.tuesday) {
      this.currentUser.schedule.push({
        day: 2,
        start: that.tuesdayStartHour,
        end: that.tuesdayEndHour
      });
    }
    if (this.wednesday) {
      this.currentUser.schedule.push({
        day: 3,
        start: that.wednesdayStartHour,
        end: that.wednesdayEndHour
      });
    }
    if (this.thursday) {
      this.currentUser.schedule.push({
        day: 4,
        start: that.thursdayStartHour,
        end: that.thursdayEndHour
      });
    }
    if (this.friday) {
      this.currentUser.schedule.push({
        day: 5,
        start: that.fridayStartHour,
        end: that.fridayEndHour
      });
    }
    if (this.saturday) {
      this.currentUser.schedule.push({
        day: 6,
        start: that.saturdayStartHour,
        end: that.saturdayEndHour
      });
    }
    if (this.sunday) {
      this.currentUser.schedule.push({
        day: 7,
        start: that.sundayStartHour,
        end: that.sundayEndHour
      });
    }
    
    this.api.edit(this.currentUser)
      .then(response => {
        window.reload();
      })
      .catch(response => {
        this.error = response;
      });
  }

  dataAssignment() {
    let that = this;
    this.currentUser.telephone = this.dataUser.telephone;
    this.currentUser.about = this.dataStudioFree.about;
    this.currentUser.fbUrl = this.dataStudioFree.fbUrl;
    this.currentUser.twUrl = this.dataStudioFree.twUrl;
    this.currentUser.insUrl = this.dataStudioFree.insUrl;
    this.currentUser.state = this.dataUser.addressId.stateId.name;
    this.currentUser.suburb = this.dataUser.addressId.suburbId.name;
    this.currentUser.town = this.dataUser.addressId.townId.name;
    this.currentUser.street = this.dataUser.addressId.street;
    this.currentUser.numInt = this.dataUser.addressId.numInt;
    this.currentUser.numExt = this.dataUser.addressId.numExt;
    this.dataStudioFree.schedule.forEach(function(schedule) {
      that.currentUser.schedule.push({
        day: schedule.dayId,
        end: schedule.end,
        start: schedule.start
      });
    });
    this.dataStudioFree.styles.forEach(function(style) {
      that.currentUser.styles.push({ styleId: style.styleId });
    });
  }

  attached() {
    let that = this;
    this.dataAssignment();
    this.client.simplePetition('style', 'GET')
      .then(styles => {
        let user = that.currentUser.styles;
        that.stylesFromAPI = styles;
        that.stylesFromAPI.forEach(function(style) {
          user.forEach(function(styleUser) {
            if (style.id === styleUser.styleId) {
              style.active = true;
            }
          });
        });
      })
      .catch(error => {
        this.error = response;
      });
    
    this.tattoo.get(this.dataStudioFree.id)
      .then(response => {
        that.tattoos = response;
      })
      .catch(error => {
        this.error = response;
      });
  
    this.flash.get(this.dataStudioFree.id)
      .then(response => {
        that.flashes = response;
      })
      .catch(error => {
        this.error = response;
      });

    this.dataStudioFree.schedule.forEach(function(schedule) {
      if (schedule.dayId === 1) {
        that.monday = true;
        that.mondayStartHour = schedule.start;
        that.mondayEndHour = schedule.end;
      }
      if (schedule.dayId === 2) {
        that.tuesday = true;
        that.tuesdayStartHour = schedule.start;
        that.tuesdayEndHour = schedule.end;
      }
      if (schedule.dayId === 3) {
        that.wednesday = true;
        that.wednesdayStartHour = schedule.start;
        that.wednesdayEndHour = schedule.end;
      }
      if (schedule.dayId === 4) {
        that.thursday = true;
        that.thursdayStartHour = schedule.start;
        that.thursdayEndHour = schedule.end;
      }
      if (schedule.dayId === 5) {
        that.friday = true;
        that.fridayStartHour = schedule.start;
        that.fridayEndHour = schedule.end;
      }
      if (schedule.dayId === 6) {
        that.saturday = true;
        that.saturdayStartHour = schedule.start;
        that.saturdayEndHour = schedule.end;
      }
      if (schedule.dayId === 7) {
        that.sunday = true;
        that.sundayStartHour = schedule.start;
        that.sundayEndHour = schedule.end;
      }
    });
  }
}
