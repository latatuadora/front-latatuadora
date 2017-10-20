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
    this.basurl = 'http://sandbox.latatuadora.getmore.mx:1337/';
    let getToken = JSON.parse(localStorage.getItem('aurelia_authentication'));
    if (getToken !== null) {
      this.token = getToken.token;
    } else {
      this.token = '';
    }
    // Create a new http client to handle and fire request and response
    this.client = new HttpClient();
    // configure client with a endpoint and defaults
    this.client.configure(config => {
      config
        .withBaseUrl('http://sandbox.latatuadora.getmore.mx:1337/')
        //.withBaseUrl('http://192.168.15.32:1337/')
        .withDefaults({
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-authorization': this.token
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
    });
    return endpoint
  }
  
  /**
   * @PUBLIC URL
   * @DESCRIPTION generate a simple petition

   */
  simpleNativePetition(url, method, data, cb) {
    var xmlhttp = new XMLHttpRequest(),
      token = JSON.parse(localStorage.getItem('aurelia_authentication'));
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if (xmlhttp.status == 200) {
          cb(xmlhttp.responseText, null);
        }
        else if (xmlhttp.status == 400) {
          cb(null, xmlhttp.status);
        }
        else {
          cb(null, xmlhttp.status);
        }
      }
    };
    xmlhttp.open(method, this.basurl.concat(url), true);
    if (token) {
      xmlhttp.setRequestHeader('x-authorization', token.token);
    }
    xmlhttp.send(data);
  }
  
  simplePetition(url, method, data) {
    var opts,that;
  
    that = this;
    opts = {
      method: method
    };
    
    if (data) {
      opts.body = json(data);
    }
    return new Promise(function(accept, reject) {
      return that.client
        .fetch(url, opts)
        .then(response => accept(response.json())).catch(error => reject(error));
    });
  }
}
