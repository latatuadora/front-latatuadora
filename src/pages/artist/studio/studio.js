import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

class CarouselOptions {
  constructor(includeArrows) {
    this.pagination = '.swiper-pagination';
    if (includeArrows) {
      this.prevButton = '.swiper-button-prev';
      this.nextButton = '.swiper-button-next';
    }
    this.slidesPerView = 'auto';
    this.loop = false;
    this.paginationClickable = true;
  }
};

@inject(MockAPI)
export class Studio {
  constructor(api) {
    this.api = api;
    this.tattoosCarousel = {
      init: false,
      options: new CarouselOptions(true)
    };
    this.tattoosCarousel.options.spaceBetween = 5;

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

    this.evaluationsCarousel = {
      init: false,
      options: new CarouselOptions(true)
    };
    this.evaluationsCarousel.options.slidesPerView = 1;

    this.artistsCarousel = {
      init: false,
      options: new CarouselOptions(true)
    };
    this.artistsCarousel.options.slidesPerView = 1;

    this.photosCarousel = {
      init: false,
      options: new CarouselOptions(true)
    };

    this.tattoos = [];
    this.flashes = [];
  }

  activate(params, routeConfig) {
    this.getStudio(parseInt(params.id));
  }

  getTattoos() {
    this.api.getTattoos()
      .then(tattoos => {
        this.tattoos = tattoos;
        this.tattoosCarousel.init = true;
      });
  }

  getFlashes() {
    this.api.getTattoos()
      .then(flashes => {
        this.flashes = flashes;
        this.flashesCarousel.init = true;
      });
  }

  getStudio(id) {
    this.api.getStudio(id)
      .then(studio => {
        this.studio = studio;
        this.photosCarousel.init = true;
        this.evaluationsCarousel.init = true;
        this.artistsCarousel.init = true;
        this.getTattoos();
        this.getFlashes();
      });
  }
}