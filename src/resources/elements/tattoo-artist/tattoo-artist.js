import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class TattooArtist {

  @bindable artist

  constructor (router) {
    this.router = router;
  }

  bind() {
    this.artist.styles && this.styles()
  }

  styles() {

    const medium = matchMedia('(min-width: 512px)')
    const checkStyles = mediaquerie => {

      this.styles = mediaquerie.matches
        ? this.artist.styles.slice(0, 4)
        : this.artist.styles.slice(0, 2)

    }

    medium.addListener(checkStyles)
    checkStyles(medium)

  }

  studio () {
    if(this.artist.id) this.router.navigateToRoute('studio',{ id: this.artist.id })
    else this.router.navigateToRoute('inspirate')
  }


}
