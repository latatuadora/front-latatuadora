import {bindable} from 'aurelia-framework';

export class GalleryModal {
  @bindable item;
  @bindable type = 'tattoo';
  @bindable vote;
  @bindable comment;
  @bindable goPrev;
  @bindable goNext;
}