import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {MockAPI} from 'utils/mock-api';
import {Session} from 'utils/session';

@inject(MockAPI, Router, Session)
export class Homepage {

  constructor(api, router, session) {
    this.api = api;
    this.router = router;
    this.session = session;
    this.iWantTo = 1;
    this.featuredOption = 1;
    this.featuredArtists = [];
    this.tattoos = [];
  }

  created() {
    this.getFeaturedArtists();
    this.getTattoos();
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

  getTattoos() {
    this.api.getTattoos()
      .then(tattoos => {
        this.tattoos = tattoos;
      })
  }

  getFeaturedArtists(type = 'featured') {
    this.api.getFeaturedArtists(type)
      .then(artists => {
        this.featuredArtists = artists;
        this.changeFeaturedOption(type);
      });
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
