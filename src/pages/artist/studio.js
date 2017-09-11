import {inject} from 'aurelia-framework';
import {MockAPI} from 'utils/mock-api';
import {BaseModal} from 'utils/base-modal';
import {Controller} from 'controller/controller'

class CarouselOptions extends BaseModal {
  constructor(includeArrows) {
    super();
    this.pagination = '.swiper-pagination';
    if (includeArrows) {
      this.prevButton = '.swiper-button-prev';
      this.nextButton = '.swiper-button-next';
    }
    this.slidesPerView = 'auto';
    this.loop = false;
    this.paginationClickable = true;

    this.showModal = false;
    this.currentItem = null;
  }
};

@inject(MockAPI, Controller)
export class Studio {
  constructor(api, controller) {
    this.api = api;
    this.controller = controller
    this.tattoosCarousel = {
      init: false,
      options: new CarouselOptions(true)
    };
    this.tattoosCarousel.options.spaceBetween = 5;
    this.tattoosCarousel.options.centeredSlides = true;

    this.flashesCarousel = {
      init: false,
      options: new CarouselOptions(false)
    };
    this.flashesCarousel.options.slidesPerView = 4;
    this.flashesCarousel.options.slidesPerColumn = 2;
    this.flashesCarousel.options.breakpoints = {
      1023: {
        slidesPerView: 2
      }
    };

    this.evaluationsCarousel = {
      init: false,
      options: new CarouselOptions(true)
    };
    this.evaluationsCarousel.options.slidesPerView = 1;

    this.artistsCarousel = {
      init: false,
      options: new CarouselOptions(true)
    };
    this.artistsCarousel.options.centeredSlides = true;
    this.artistsCarousel.options.effect = 'coverflow';
    this.artistsCarousel.options.coverflow = {
      rotate: 0,
      stretch: 90,
      depth: 500,
      modifier: 1,
      slideShadows : false
    };
    this.artistsCarousel.options.breakpoints = {
      580: {
        coverflow: {
          rotate: 0,
          stretch: 60,
          depth: 400,
          modifier: 1,
          slideShadows : false
        }
      }
    };

    this.photosCarousel = {
      init: false,
      options: new CarouselOptions(true)
    };

    this.tattoos = [];
    this.flashes = [];
  }

  activate(params, routeConfig) {
    this.getStudio(parseInt(params.id));
  }

  getTattoos() {

    this.controller.artist.find({studio: this.studio.id})
      .then(artist => {
        console.log(artist)
        this.tattoos = [].concat(...artist.map(a => a.tattoos.splice(0,5)))
        this.tattoos.map(t => t.image = 'http://sandbox.latatuadora.getmore.mx:1337/images/' + t.image)
        this.tattoosCarousel.init = true

      })
  }

  getStudio(id) {
    this.controller.studio.get(id)
      .then(studio => {
        this.studio = studio;
        this.photosCarousel.init = true;
        this.evaluationsCarousel.init = true;
        this.artistsCarousel.init = true;
        this.getTattoos();
        // this.getFlashes();
      });
  }

  openModal(index) {
    this.showModal = true;
    this.currentItem = this.tattoos[index];
  }

  closeModal(group) {
    this.showModal = false;
  }

  changeItem(next, group) {
    let lastItem = this.tattoos.length - 1;
    let currentItem = this.currentItem.index;
    let newIndex = 0;
    if (next) {
      newIndex = currentItem < lastItem ? currentItem + 1 : 0;
    } else {
      newIndex = currentItem > 0 ? currentItem - 1 : lastItem;
    }
    this.currentItem = this.tattoos[newIndex];
    this.currentItem.index = newIndex;
  }
}
