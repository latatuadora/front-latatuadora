import { Client } from './client';
import {json} from 'aurelia-fetch-client';

export class Schedule extends Client {
  
  constructor() {
    super();
  }
  
  schedule(body) {
    let that = this;
    return new Promise (function(accept, reject) {
      return that.simpleNativePetition('itinerary/add', 'POST', body, function(success, error) {
        if (success) {
          accept(success);
        } else {
          reject(error);
        }
      });
    });
  }
  
  get() {
    let that = this;
    return new Promise (function(accept, reject) {
      let url = 'itinerary/getAllAsStudio';
      return that.simplePetition(url, 'GET', null)
        .then(data => accept(data))
        .catch(error => reject(error));
    });
  }
}
