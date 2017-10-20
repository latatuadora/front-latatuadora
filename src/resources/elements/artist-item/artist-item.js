import {bindable, containerless} from 'aurelia-framework';

@containerless
export class ArtistItem {
  @bindable artist;
  @bindable animate = false;
  @bindable fullCard = true;

  attached() {
    if (this.fullCard) {
      document.addEventListener('click', this.onClick);
      if (this.animate) {
        this.artistCard.classList.add('animate');
      }
    }
  }

  onClick = (e) => {
    let isTarget = this.artistCard.contains(e.target);
    if (isTarget) {
      this.artistCard.classList.add('active');
    } else {
      this.artistCard.classList.remove('active');
    }
  }

  detached() {
    if (this.fullCard) {
      document.removeEventListener('click', this.onClick);
    }
  }
}
