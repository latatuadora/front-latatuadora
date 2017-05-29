import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {MockAPI} from 'utils/mock-api';

@inject(Router, MockAPI)
export class QuotationResults {
  constructor(router, api) {
    this.router = router;
    this.api = api;
    this.results = {};
    this.tattoos = [];
    this.flashes = [];
    this.initSwiper = false;
    this.getItems('tattoos');
    this.getItems('flashes');
  }

  activate(params, routeConfig) {
    if (routeConfig.settings.resultsModel) {
      this.results = routeConfig.settings.resultsModel;
      localStorage.setItem('quotationResults', JSON.stringify(this.results));
    }
    else {
      this.results = JSON.parse(localStorage.getItem('quotationResults'));
    }
  }

  bind() {
    this.swiperOptions = {
      pagination: '.swiper-pagination',
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      spaceBetween: 30,
      paginationClickable: true,
      breakpoints: {
        909: {
          spaceBetween: 17
        }
      }
    };
  }

  getItems(type) {
    let capitalized = type.charAt(0).toUpperCase() + type.slice(1);
    let method = 'get' + capitalized;
    this.api.getTattoos({artist: this.results.artist})
      .then(items => {
        this[type] = items;
        if (this.flashes.length && this.tattoos.length) {
          this.initSwiper = true;
        }
      });
  }
}