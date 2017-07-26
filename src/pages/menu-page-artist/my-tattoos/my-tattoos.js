import {BaseModal} from 'utils/base-modal';

export class MyTatoos extends BaseModal {
  constructor () {
    super();
    this.title = ["Mis", "tatuajes"];
    this.newtattoo = "agregar nuevo tatuaje";
  }
}