import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

class Carousel {
  constructor(includeArrows) {
    this.pagination = '.swiper-pagination';
    if (includeArrows) {
      this.prevButton = '.swiper-button-prev';
      this.nextButton = '.swiper-button-next';
    }
    this.slidesPerView = 'auto';
    this.loop = true;
    this.paginationClickable = true;
  }
};

@inject(MockAPI)
export class Studio {
  constructor(api) {
    this.api = api;
    this.initTattoos = false;
    this.initFlashes = false;
    this.initPhotos = false;
    this.tattoosOptions = new Carousel(true);
    this.tattoosOptions.spaceBetween = 5;
    this.flashesOptions = new Carousel(false);
    this.flashesOptions.slidesPerView = 4;
    this.flashesOptions.slidesPerColumn = 2;
    this.tattoos = [];
    this.flashes = [];
    this.getTattoos();
    this.getFlashes();
  }

  getTattoos() {
    this.api.getTattoos()
      .then(tattoos => {
        this.tattoos = tattoos;
        this.initTattoos = true;
      });
  }

  getFlashes() {
    this.api.getTattoos()
      .then(flashes => {
        this.flashes = flashes;
        this.initFlashes = true;
      });
  }
}