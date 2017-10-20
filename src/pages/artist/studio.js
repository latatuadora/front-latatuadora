import {MockAPI} from 'utils/mock-api';
import {Flash} from 'controller/flash';
import { Router } from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {BaseModal} from 'utils/base-modal';
import {Controller} from 'controller/controller';

class CarouselOptions extends BaseModal {
  constructor(includeArrows) {
    super();
    this.pagination = '.swiper-pagination';
    if (includeArrows) {
      this.prevButton = '.swiper-button-prev';
      this.nextButton = '.swiper-button-next';
    }
    this.slidesPerView = 'auto';
    this.loop = false;
    this.paginationClickable = true;
    
    this.showModal = false;
    this.currentItem = null;
  }
}

@inject(Flash, Router, MockAPI, Controller)
export class Studio {
  constructor(flash, router, api, controller) {
    this.api = api;
    this.tattoos = [];
    this.flashes = [];
    this.flash = flash;
    this.router = router;
    this.controller = controller;
    
    this.photosCarousel = {
      init: false,
      options: new CarouselOptions(true)
    };
    this.tattoosCarousel = {
      init: false,
      options: new CarouselOptions(true)
    };
    this.tattoosCarousel.options.spaceBetween = 5;
    this.tattoosCarousel.options.centeredSlides = true;
  
    this.flashesCarousel = {
      init: false,
      options: new CarouselOptions(false)
    };
    this.flashesCarousel.options.slidesPerView = 4;
    this.flashesCarousel.options.slidesPerColumn = 2;
    this.flashesCarousel.options.breakpoints = {
      1023: {
        slidesPerView: 2
      }
    };
  }
  
  getTattoos() {
    this.controller.tattoo.get(this.studio.id)
      .then(artist => {
        this.tattoos = artist.splice(0, 12);
        this.tattoosCarousel.init = true;
      });
  }
  
  schedule(studio) {
    let that = this;
    studio.schedule.forEach(function(schedule) {
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
  
  getStudio(id) {
    this.controller.studio.getDataUser({user: id})
      .then(apiResult => {
        let result = apiResult;
        if(this.isFreelancer(result)) {
          this.studio = this.joinObjects(result, result.freelancer);
        } else {
          this.studio = this.joinObjects(result, result.studio);
        }
        this.schedule(this.studio);
        this.photosCarousel.init = true;
        this.getTattoos();
      });
  }
  
  isFreelancer(result) {
    return result.userType.id === 4;
  }
  
  attached() {
    let id = this.router.currentInstruction.params.id;
    this.getStudio(id);
  }
  
  joinObjects(Object1, Object2) {
    return Object.assign(Object1, Object2);
  }
}
