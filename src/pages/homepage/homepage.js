import { Client } from '../../controller/client'
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Static} from 'controller/static';
import {Session} from 'utils/session';

@inject(Router, Session)
export class Homepage extends Client {
  
  constructor(router, session) {
    super();
    this.router = router;
    this.session = session;
    this.iWantTo = 1;
    this.artists = [];
    this.artistIntervalId = 0;
    this.styles = new Static('HOMEPAGE::STYLES')
  }
  
  attached() {
    
    let carouselIndex = 0;
    let that = this;
    this.artistIntervalId = setInterval(function() {
      if(that.artists.length === 0) {
        that.loadArtists();
      } else {
        clearInterval(that.artistIntervalId)
      }
    });
    
    const carousel = [
      'home-carousel-1.jpg',
      'home-carousel-2.jpg',
      'home-carousel-3.jpg'
    ];
    
    this.carouselInterval = setInterval(() => {
      carouselIndex = carousel.length - 1 > carouselIndex ? carouselIndex + 1 : 0;
      this.carouselImage = 'src/assets/images/backgrounds/' + carousel[carouselIndex];
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
  
  loadArtists() {
    let that = this;
    this.simplePetition('studio', 'GET')
      .then(data => {
        that.artists = that._parseStudiosArray(that._shuffleArray(data.studios).slice(0, 16));
      })
      .catch(error => {
        this.error = error;
      });
  }
  
  _shuffleArray(array) {
    for(let j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
  }
  _parseStudiosArray(array) {
    let parsedArray = [];
    for(let i = 0; i< array.length; i++) {
      let parsedObject = {
        id: array[i].id,
        rating: (array[i].rank ? array[i].rank * 5 : 5),
        name: array[i].name,
        location: array[i].state || "Ciudad de México",
        titleImgUrl: array[i].titleImgUrl || 'src/assets/images/backgrounds/featured-1.png'
      };
      parsedArray.push(parsedObject)
    }
    return parsedArray;
  }
}
