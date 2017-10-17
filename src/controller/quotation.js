import { Client } from './client'
import {AuthService} from 'aurelia-authentication';
import {inject, computedFrom} from 'aurelia-framework';
import {json} from 'aurelia-fetch-client';

export class Quotation extends Client {

  constructor() {
    super()
    console.log(this.client)
  }

  quotation(body) {
    const endpoint = 'quotation';
    return this.client
      .fetch(`${endpoint}`,{
        method: this.methods.post,
        body: json(body)
      })
      .then(response => response.json())
      .then(quotation => {
        return quotation
      })
      .catch(error => {
        return error
      })
  }
  
  getQuotation() {
    const endpoint = 'quotation';
    return this.client
      .fetch(`${endpoint}`,{
        method: this.methods.get
      })
      .then(response => response.json())
      .then(quotation => {
        return quotation
      })
      .catch(error => {
        return error
      })
  }

}
