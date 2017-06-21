import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {MockAPI} from 'utils/mock-api';

@inject(Router, MockAPI)
export class QuotationResults {
  constructor(router, api) {
    this.router = router;
    this.api = api;
    this.results = {};
    this.groups = {
      tattoos: {
        showModal: false,
        currentItem: null,
        initCarousel: false,
        items: []
      },
      flashes: {
        showModal: false,
        currentItem: null,
        initCarousel: false,
        items: []
      }
    };
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
      spaceBetween: 0,
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
        this.groups[type].items = items;
        this.groups[type].showModal = true;
      });
  }

  openModal(group, index) {
    this.groups[group].showModal = true;
    this.groups[group].currentItem = this.groups[group].items[index];
  }

  closeModal(group) {
    this.groups[group].showModal = false;
  }

  changeItem(next, group) {
    let lastItem = this.groups[group].items.length - 1;
    let currentItem = this.groups[group].currentItem.index;
    let newIndex = 0;
    if (next) {
      newIndex = currentItem < lastItem ? currentItem + 1 : 0;
    } else {
      newIndex = currentItem > 0 ? currentItem - 1 : lastItem;
    }
    this.groups[group].currentItem = this.groups[group].items[newIndex];
    this.groups[group].currentItem.index = newIndex;
  }
}