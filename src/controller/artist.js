import { Client } from './client'
import {inject, computedFrom} from 'aurelia-framework';

export class Artist extends Client {

  constructor() {
    super()
    this.endpoint = 'artist'
  }

  artist(id) {

    const url = this.URL(this.endpoint, `${id}`)

    return this.client
      .fetch(`${url}`, {
        method: this.methods.get
      })
      .then(response => response.json())
      .then(artist => {
        return artist
      })
      .catch(error => {
        return error
      })

  }

}
