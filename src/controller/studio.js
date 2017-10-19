// @flow

import { Client } from './client';
import {json} from 'aurelia-fetch-client';

export class Studio extends Client {

  endpoint = 'studio'

  constructor() {
    super()
  }
  
  getDataUser(params) {
    const endpoint = 'user/getById';
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
  
  getDataCurrentUser(params) {
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
  
  get(id) {
    const url = this.URL(this.endpoint, `${id}`);
    return this.client
      .fetch(url, {
        method: this.methods.get
      })
      .then(response => response.json())
      .then(studio => {
        return studio
      })
      .catch(error => {
        return error
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
  
  getUserAll(style, type) {
    let that = this;
    if (type && style) {
      this.url = 'user/all?style=' +  style + 'userType=' + type;
    } else if (type) {
      console.log(style, type);
      this.url = 'user/all?userType=' + type;
    } else if(style) {
      this.url = 'user/all?style=' + style;
    }
    return new Promise (function(accept, reject) {
      return that.simplePetition(that.url, 'GET', null)
        .then(data => accept(data.result))
        .catch(error => reject(error));
    });
  }
}
