import {inject, bindable} from 'aurelia-framework';
import swiper from 'swiper';

@inject(Element)
export class SwiperCarouselCustomAttribute {
  @bindable options;

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.swiper = new swiper(this.element, this.options);
    this.swiper.slideTo((this.swiper.slides.length / 2));
  }
}