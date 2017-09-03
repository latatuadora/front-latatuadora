import { Client } from './client'
import {AuthService} from 'aurelia-authentication';
import {inject, computedFrom} from 'aurelia-framework';
import {json} from 'aurelia-fetch-client';

export class Studio extends Client {

  endpoint = 'studio'

  constructor() {
    super()
  }

  get(id) {

    const url = this.URL(this.endpoint, `${id}`)

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
      })
  }

}
