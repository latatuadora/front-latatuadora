import {MockAPI} from 'utils/mock-api';
import {inject} from 'aurelia-framework';

@inject(MockAPI)
export class Homepage {
  constructor(api) {
    this.api = api;
    this.iWantTo = 1;
    this.featuredOption = 1;
    this.featuredArtists = [];
  }

  created() {
    this.getFeaturedArtists();
    this.api.getTattoos()
      .then(tattoos => {
        console.log(tattoos);
      });
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