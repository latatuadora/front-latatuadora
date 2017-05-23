import {MockAPI} from 'utils/mock-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(MockAPI, Router)
export class Homepage {
  constructor(api, router) {
    this.api = api;
    this.router = router;
    this.iWantTo = 1;
    this.featuredOption = 1;
    this.featuredArtists = [];
    this.tattoos = [];
  }

  created() {
    this.getFeaturedArtists();
    this.getTattoos();
  }

  getTattoos() {
    this.api.getTattoos()
      .then(tattoos => {
        this.tattoos = tattoos;
      })
  }

  goToGallery(param, value) {
    let query = {};
    query[param] = value;
    this.router.navigateToRoute('inspirate', query);
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