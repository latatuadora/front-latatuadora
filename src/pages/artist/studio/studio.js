import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';

@inject(MockAPI)
export class Studio {
  constructor(api) {
    this.api = api;
    this.initCarousel = false;
    this.carouselOptions = {
      pagination: '.swiper-pagination',
      slidesPerView: 4,
      loop: true,
      spaceBetween: 30,
      paginationClickable: true,
      breakpoints: [
        1024: {
          slidesPerView: 1
        }
      ]
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