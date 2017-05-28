import {inject} from 'aurelia-framework';
import {Router, Redirect} from 'aurelia-router';
import {BaseMultiStep} from 'utils/base-multi-step';
import {MockAPI} from 'utils/mock-api';

@inject(Router, MockAPI)
export class Quotation extends BaseMultiStep {
  constructor(router, api) {
    super();
    this.router = router;
    this.api = api;
    this.completeDestination = '';
    this.showLoader = false;
    this.viewModels = [
      'pages/quotation/step-1/step-1',
      'pages/quotation/step-2/step-2',
      'pages/quotation/step-3/step-3',
      'pages/quotation/step-4/step-4',
      'pages/quotation/step-5/step-5'
    ];
    this.shared = {
      height: 10,
      width: 10,
      artist: null,
      style: null,
      bodyPart: {type: '', id: -1, image: ''},
      referenceFile: {file: null, data: null},
      additionalComment: '',
      userData: {name: '', email: '', phone: '', city: ''},
      changeHeight: (height) => {this.shared.height = height;},
      changeWidth: (width) => {this.shared.width = width;},
      changeStyle: (style) => {this.shared.style = style;},
      changePart: (type, id, image) => {
        this.shared.bodyPart.type = type;
        this.shared.bodyPart.id = id;
        this.shared.bodyPart.image = image;
      },
      changeFile: (file, data) => {
        this.shared.referenceFile.file = file;
        this.shared.referenceFile.data = data;
      },
      changeComment: (comment) => {this.shared.additionalComment = comment;}
    }
  }

  cancel() {
  }

  complete() {
    super.complete()
      .then(valid => {
        if (valid) {
          this.showLoader = true;
          this.postRequest();
        }
      });
  }

  postRequest() {
    let request = {
      body_part: this.shared.bodyPart.id,
      style: this.shared.style,
      dimensionX: this.shared.width,
      dimensionY: this.shared.height,
      user: this.shared.userData,
      reference: this.shared.referenceFile.file,
      studio: this.shared.artist ? this.shared.artist.id : null
    };
    this.api.postQuotationRequest(request)
      .then(results => {
        this.goToResults(results);
      });
  }

  goToResults(results) {
    for (let route of this.router.routes) {
      if (route.name == this.completeDestination) {
        route.settings.resultsModel = {
          artist: this.shared.artist,
          minAmount: response.min_amount,
          maxAmount: response.max_amount
        };
        break;
      }
    };
    this.router.navigateToRoute(this.completeDestination);
  }
}