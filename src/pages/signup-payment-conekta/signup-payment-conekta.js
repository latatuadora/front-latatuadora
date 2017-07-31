import {BaseModal} from 'utils/base-modal';

export class SignupPaymentConekta extends BaseModal{
  constructor () {
    super();
    this.paySignup = {
      title: "Pago",
      signupPrice: "1000.00"
    }
  }
}