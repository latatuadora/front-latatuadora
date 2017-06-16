import {bindable, containerless} from 'aurelia-framework';
import {ArtistItem} from 'resources/elements/artist-item/artist-item';

@containerless
export class FlashSquareItem extends ArtistItem {
  @bindable item;
  @bindable animate = false;

  constructor() {
    super();
  }
}