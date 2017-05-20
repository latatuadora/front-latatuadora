import {MockAPI} from 'utils/mock-api';
import {inject} from 'aurelia-framework';

@inject(MockAPI)
export class Homepage {
  constructor(api) {
    this.api = api;
    this.iWantTo = 1;
    this.featuredArtists = [];
  }

  created() {
    this.api.getFeaturedArtists()
      .then(artists => this.featuredArtists = artists);
  }

  changeIWantTo(iWantToOption) {
    this.iWantTo = iWantToOption;
  }
}