// @flow

import { Client } from './client'
import {AuthService} from 'aurelia-authentication';
import {inject, computedFrom} from 'aurelia-framework';
import {json} from 'aurelia-fetch-client';

export class Studio extends Client {

  endpoint = 'studio'

  constructor() {
    super()
  }
  
  getDataUser(params) {
    const endpoint = 'user/get';
    let url = this.URL(endpoint, params);
    return this.client
      .fetch(`${url}`, {
        method: this.methods.get,
      })
      .then(response => response.json())
      .then(data => {
        return data.result;
      })
      .catch(error => {
        return error;
      });
  }

  edit(data) {
    const endpoint = 'edit'
    return this.client
      .fetch(`${endpoint}`,{
        method: this.methods.put,
        body: json(data)
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  }
  
  getImages(id) {
    let that = this;
    return new Promise (function(accept, reject) {
      let url = 'carrousel/' + id;
      return that.simplePetition(url, 'GET', null)
        .then(data => accept(data))
        .catch(error => reject(error));
    });
  }
}
