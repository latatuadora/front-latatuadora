import {bindable} from 'aurelia-framework';

export class SuccessDeleteArtistModal {
  @bindable flash;
  @bindable type = 'tattoo';
  @bindable vote;
  @bindable comment;
  @bindable goPrev;
  @bindable goNext;
  @bindable close;
}