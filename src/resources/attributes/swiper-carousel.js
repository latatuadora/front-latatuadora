import {inject, bindable} from 'aurelia-framework';
import swiper from 'swiper';

@inject(Element)
export class SwiperCarouselCustomAttribute {
  @bindable options;
  @bindable init = true;

  constructor(element) {
    this.element = element;
    this.created = false;
  }

  attached() {
    if (this.init) {
      this.createSwiper();
    }
  }

  initChanged() {
    if (this.init && !this.created) {
      this.createSwiper();
    }
  }

  createSwiper() {
    this.swiper = new swiper(this.element, this.options);
    this.swiper.slideTo((this.swiper.slides.length / 2));
    this.created = true;
  }
}