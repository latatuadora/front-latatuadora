import {Client} from './client'

export class Address extends Client {

  endpoint = 'address'

  constructor() {
    super();
  }

  get(type, params) {

    let url = this.endpoint;

    switch (type) {
      case 'STUDIO':
        url += '/studioAddress'
        break;
      case 'FREELANCE':
        url += '/freelanceAddress'
        break;
      case 'USER':
        url += '/userAddress'
        break;
    }

    url = this.URL(url, params)

    return this.client
      .fetch(`${url}`, {
        method: this.methods.get
      })
      .then(response => response.json())
      .then(address => {
        return address
      })
      .catch(error => {
        return error
      })

  }

}
