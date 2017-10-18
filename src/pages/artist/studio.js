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
    this.flash = flash;
    this.router = router;
    this.tattoos = [];
    this.flashes = [];
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
        console.log(artist);
        //this.tattoos = artist;
        this.tattoos = artist.splice(0, 12);
        this.tattoosCarousel.init = true;
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
        console.log(this.studio);
        this.photosCarousel.init = true;
        //this.evaluationsCarousel.init = true;
        //this.artistsCarousel.init = true;
        this.getTattoos();
        // this.getFlashes();
      });
  }
  
  isFreelancer(result) {
    return result.studio.addressId.id === 0;
  }
  
  attached() {
    let id = this.router.currentInstruction.params.id;
    this.getStudio(id);
  }
  
  joinObjects(Object1, Object2) {
    return Object.assign(Object1, Object2);
  }
}
