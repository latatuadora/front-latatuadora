import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

let baseCarousel = {
  pagination: '.swiper-pagination',
  prevButton: '.swiper-button-prev',
  nextButton: '.swiper-button-next',
  slidesPerView: 'auto',
  loop: true,
  paginationClickable: true
};

@inject(MockAPI)
export class Studio {
  constructor(api) {
    this.api = api;
    this.initTattoos = false;
    this.initFlashes = false;
    this.initPhotos = false;
    this.tattoosOptions = baseCarousel;
    this.tattoosOptions.spaceBetween = 5;
    this.flashesOptions = baseCarousel;
    this.tattoos = [];
    this.flashes = [];
    this.getTattoos();
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