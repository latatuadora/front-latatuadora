import {bindable} from 'aurelia-framework';

export class DropdownModal {
  @bindable list;
  @bindable onClick;
  @bindable itemName;
  @bindable activeId;
}