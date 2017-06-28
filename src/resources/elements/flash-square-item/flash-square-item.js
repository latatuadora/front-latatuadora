import {bindable, containerless} from 'aurelia-framework';
import {ArtistItem} from 'resources/elements/artist-item/artist-item';

@containerless
export class FlashSquareItem extends ArtistItem {
  @bindable item;
  @bindable animate = false;
  @bindable inCarousel = false;
  @bindable fullCard = true;

  attached() {
    super.attached();
    if (this.inCarousel) {
      this.artistCard.classList.add('swiper-slide');
    }
  }
}