import {BaseModal} from 'utils/base-modal';

export class PaymentFlashConekta extends BaseModal {
  constructor () {
    super();
    this.payFlash = {
      title: "Pago",
      flashPrice: "300.00"
    }
  }
}