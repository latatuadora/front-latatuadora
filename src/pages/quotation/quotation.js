import {BaseMultiStep} from 'utils/base-multi-step';

export class Quotation extends BaseMultiStep {
  constructor() {
    super();
    this.viewModels = [
      'pages/quotation/step-1'
    ];
  }

  cancel() {

  }

  complete() {

  }
}