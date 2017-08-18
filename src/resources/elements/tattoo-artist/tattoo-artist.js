import { bindable } from 'aurelia-framework';

export class TattooArtist {

  @bindable artist;

  attached() {


    const medium = matchMedia('(min-width: 512px)')
    const checkStyles = mediaquerie => {

      this.styles = mediaquerie.matches
                  ? this.artist.styles.slice(0, 4)
                  : this.artist.styles.slice(0, 2)

    }
    medium.addListener(checkStyles)
    checkStyles(medium)

  }

}
