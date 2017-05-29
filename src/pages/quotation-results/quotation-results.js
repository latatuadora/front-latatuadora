import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {MockAPI} from 'utils/mock-api';

@inject(Router, MockAPI)
export class QuotationResults {
  constructor(router, api) {
    this.router = router;
    this.api = api;
    this.results = {};
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
      pagination: this.paginationElement,
      centeredSlides: true,
      spaceBetween: 30,
      slidesPerView: 'auto',
      loop: false,
      paginationClickable: true,
      breakpoints: {
        909: {
          loop: true,
          spaceBetween: 17
        }
      }
    };
  }
}