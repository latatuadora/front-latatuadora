import {inject} from 'aurelia-framework';
import {Router, Redirect} from 'aurelia-router';
import {BaseMultiStep} from 'utils/base-multi-step';

@inject(Router)
export class Quotation extends BaseMultiStep {
  constructor(router) {
    super();
    this.router = router;
    this.completeDestination = '';
    this.viewModels = [
      'pages/quotation/step-1',
      'pages/quotation/step-2'
    ];
    this.resultsModel = {};
    this.shared = {
      changeHeight: (height) => {this.resultsModel.height = height;},
      changeWidth: (width) => {this.resultsModel.width = width;},
      artist: null
    }
  }

  cancel() {
  }

  complete() {
    for (let i = 0; i < this.router.routes.length; i++) {
      if (this.router.routes[i].name == this.completeDestination) {
        this.router.routes[i].settings.resultsModel = this.resultsModel;
        break;
      }
    }
    this.router.navigateToRoute(this.completeDestination);
  }
}