import {bindable} from 'aurelia-framework';
import {BaseModal} from 'utils/base-modal';

export class DeleteFlashModal extends BaseModal {
  @bindable flash;
  @bindable type = 'tattoo';
  @bindable vote;
  @bindable comment;
  @bindable goPrev;
  @bindable goNext;
  @bindable close;
}