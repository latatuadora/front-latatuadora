import {BaseModal} from 'utils/base-modal';

export class FlashItem extends BaseModal {
  constructor () {
  	super();
    console.log("Se muestra el item flash");
    this.flash = {
    	precio: '3000'
    }
  }
}