import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class TattooArtist {

  @bindable artist;

  constructor(router) {
    this.router = router;
  }
  
  isFreelancer(result) {
    return result.userType === 4;
  }
  
  attached() {
    try {
      if (this.isFreelancer(this.artist)) {
        this.artist.img = this.artist.freelancer.profileImgUrl;
      } else {
        this.artist.img = this.artist.studio.titleImgUrl;
      }
    } catch (error) {
      this.artist.img = null;
    }
  }

  studio() {
    if(this.artist.id) {
      this.router.navigateToRoute('studio',{ id: this.artist.id });
    }
    else this.router.navigateToRoute('inspirate');
  }
}
