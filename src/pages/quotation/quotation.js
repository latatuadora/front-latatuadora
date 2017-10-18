import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Controller} from 'controller/controller'

import {MockAPI} from 'utils/mock-api';
import {BaseMultiStep} from 'utils/base-multi-step';

@inject(Router, MockAPI, Controller)
export class Quotation extends BaseMultiStep {
  constructor(router, api, controller) {
    super();
    this.controller = controller
    this.router = router;
    this.api = api;
    this.completeDestination = 'quotation_results';
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
      style: 1,
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

  activate(params) {
    if (params.artist && this.isInteger(params.artist)) {
      this.getArtist(parseInt(params.artist));
    }
  }

  isInteger(value) {
    return !isNaN(value) && parseInt(value) == value;
  }

  getArtist(id) {
    this.controller.studio.getDataUser({user: id})
      .then(artist => {
        this.shared.artist = artist;
      });
  }

  next() {
    this.isValidView()
      .then(valid => {
        if (valid) {
          this.currentStep++;
          this.update();
        } else {
          window.scrollTo(0, 0);
        }
      })
  }

  cancel() {
  }

  complete() {
    super.complete()
      .then(valid => {
        if (valid) {
          this.showLoader = true;
          this.postRequest();
        } else {
          window.scrollTo(0, 0);
        }
      });
  }

  postRequest() {
    let request = {
      bodyPart: this.shared.bodyPart.id,
      style: this.shared.style,
      dimensionsX: this.shared.width,
      dimensionsY: this.shared.height,
      name: this.shared.userData.name,
      telephone: this.shared.userData.phone,
      email: this.shared.userData.email,
      city: this.shared.userData.city,
      reference: this.shared.referenceFile.file,
      comments: this.shared.additionalComment,
      studioId: this.shared.artist ? this.shared.artist.id : null
    };
    this.controller.quotation.quotation(request)
      .then(results => {
        this.goToResults(results);
      });
  }

  goToResults(results) {
    for (let route of this.router.routes) {
      if (route.name == this.completeDestination) {
        route.settings.resultsModel = {
          artist: this.shared.artist,
          minAmount: results.minAmount,
          maxAmount: results.maxAmount,
          styleText: results.styleText,
        };
        break;
      }
    };
    this.router.navigateToRoute(this.completeDestination);
  }
}
