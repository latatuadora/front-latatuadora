import { Client } from './client';
import {json} from 'aurelia-fetch-client';

export class Schedule extends Client {
  
  constructor() {
    super();
  }
  
  schedule(body) {
    const endpoint = 'itinerary/add';
    return this.client
      .fetch(`${endpoint}`,{
        method: this.methods.post,
        body: json(body)
      })
      .then(response => response.json())
      .then(quotation => {
        return quotation;
      })
      .catch(error => {
        return error;
      });
  }
}
