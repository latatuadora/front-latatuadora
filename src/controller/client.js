import {HttpClient, json} from 'aurelia-fetch-client'
export class Client {
  /**
   *@PUBLIC constructor
   *@DESCRIPTION init client
   **/
  constructor() {
    // defining methods
    this.methods = {
      post: 'POST',
      get: 'GET',
      put: 'PUT',
      patch: 'PATCH',
      delete: 'DELETE'
    };
    // Create a new http client to handle and fire request and response
    this.client = new HttpClient();
    // configure client with a endpoint and defaults
    this.client.configure(config => {
      config
        .withBaseUrl('http://sandbox.latatuadora.getmore.mx:1337/')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json'
          }
        });
    });
  }
  
  /**
   *@PUBLIC URL
   *@DESCRIPTION take and endpoint and a object with key and value and generate the final url to fetch request
   *@PARAM endpoint {String} - 'tattoo'
   *@PARAM params {Object} - '{ style: 1, bodyPart: 3 }'
   *@RETURN {String} - 'tattoo?style=1&bodyPart=3'
   **/
  URL(endpoint, params) {
    if (Object.keys(params) === 0) {
      return endpoint
    }
    if (typeof params === 'string') {
      return endpoint + `/${params}`
    }
    Object.keys(params).forEach((key) => (params[key] === null) && delete params[key]);
    Object.keys(params).map((param, index) => {
      if (params[param] !== null) {
        endpoint += index === 0
          ? `?${ param }=${ params[param] }`
          : `&${ param }=${ params[param] }`
      }
    })
    return endpoint
  }
}
