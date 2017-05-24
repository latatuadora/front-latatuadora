import {bindable} from 'aurelia-framework';

export class GalleryItem {
  @bindable item;
  @bindable type;
  @bindable vote;
}