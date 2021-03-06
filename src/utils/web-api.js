import {HttpClient, json} from 'aurelia-fetch-client';
import {MockAPI} from 'utils/mock-api';

let client = new HttpClient();

function getQuery(params) {
  let queryArray = [];
  for (let key in params) {
    if (params[key] || params[key] === false) {
      queryArray.push(key + '=' + params[key]);
    }
  }
  return queryArray.length ? '?' + queryArray.join('&') : '';
}

client.configure(x => {
  x.withBaseUrl('http://sandbox.latatuadora.getmore.mx:1337/')
    .withDefaults({
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json'
      }
    });
});

export class WebAPI extends MockAPI {
  postQuotationRequest(request) {
    console.log(request)
    return client.fetch('quotation', {
      method: 'post',
      body: json(request)
    })
    .then(response => {
      return response.json();
    });
  }

  getTattoos(params) {
    let query = getQuery(params);
    return client.fetch('tattoo' + query, {
      method: 'get'
    })
    .then(response => {
      return response.json();
    });
  }
  
  getFlashes(params) {
    let query = getQuery(params);
    return client.fetch('flash' + query, {method: 'get'})
      .then(response => {
        return response.json();
      });
  }

  getArtists() {
    return client.fetch('user', {method: 'get'})
      .then(response => {
        return response.json();
      });
  }

  getStyles() {
    return client.fetch('style', {method: 'get'})
      .then(response => {
        return response.json();
      });
  }

  getBodyParts() {
    return client.fetch('bodypart', {method: 'get'})
      .then(response => {
        return response.json();
      });
  }
}
