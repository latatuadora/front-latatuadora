import {bindable} from 'aurelia-framework';

export class GalleryModal {
  @bindable item;
  @bindable type = 'tattoo';
  @bindable vote;
  @bindable comment;
  @bindable goPrev;
  @bindable goNext;
  @bindable close;

  constructor() {
    console.log('GALLERY MODAL', this.item);
  }

  bind() {
    console.log('GALLERY MODAL', this.item)
  }

}
