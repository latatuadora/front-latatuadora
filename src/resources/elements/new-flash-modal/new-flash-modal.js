import {bindable} from 'aurelia-framework';

export class NewFlashModal {
  @bindable item;
  @bindable type = 'tattoo';
  @bindable vote;
  @bindable comment;
  @bindable goPrev;
  @bindable goNext;
  @bindable close;
}
