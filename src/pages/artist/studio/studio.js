import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

@inject(MockAPI)
export class Studio {
  constructor(api) {
    this.api = api;
    this.initCarousel = false;
    this.carouselOptions = {
      pagination: '.swiper-pagination',
      prevButton: '.swiper-button-prev',
      nextButton: '.swiper-button-next',
      slidesPerView: 'auto',
      loop: true,
      spaceBetween: 5,
      paginationClickable: true
    };
    this.tattoos = [];
    this.getTattoos();
  }

  getTattoos() {
    this.api.getTattoos()
      .then(tattoos => {
        this.tattoos = tattoos;
        this.initCarousel = true;
      });
  }
}