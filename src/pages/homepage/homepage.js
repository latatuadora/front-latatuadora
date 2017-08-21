import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Static} from 'controller/static';
import {Session} from 'utils/session';

@inject(Router, Session)
export class Homepage {

  constructor( router, session) {
    this.router = router;
    this.session = session;
    this.iWantTo = 1;
    this.artists = new Static('HOMEPAGE::FEATURED')
    this.styles = new Static('HOMEPAGE::STYLES')
    console.log(this.styles)
  }

  attached() {

    let carouselIndex = 0

    const carousel = [
      'home-carousel-1.jpg',
      'home-carousel-2.jpg',
      'home-carousel-3.jpg'
    ]

    this.carouselInterval = setInterval(() => {
      carouselIndex = carousel.length - 1 > carouselIndex ? carouselIndex + 1 : 0
      this.carouselImage = 'src/assets/images/backgrounds/' + carousel[carouselIndex]
      document.getElementById('homepage::hero').style.backgroundImage = `url('${this.carouselImage}')`
    }, 30000);

  }

  detached() {
    clearInterval(this.carouselInterval);
  }

  changeFeaturedOption(type) {
    if (type == 'featured') {
      this.featuredOption = 1;
    } else if (type == 'newest') {
      this.featuredOption = 2;
    } else if (type == 'closest') {
      this.featuredOption = 3;
    } else if (type == 'recommended') {
      this.featuredOption = 4;
    }
  }

  changeIWantTo(iWantToOption) {
    this.iWantTo = iWantToOption;
  }
}
