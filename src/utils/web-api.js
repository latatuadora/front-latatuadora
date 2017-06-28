import {HttpClient, json} from 'aurelia-fetch-client';
import {MockAPI} from 'utils/mock-api';

let client = new HttpClient();

client.configure(x => {
  x.withBaseUrl('http://35.161.232.194:1337/')
    .withDefaults({
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json'
      }
    });
});

export class WebAPI extends MockAPI {
  postQuotationRequest(request) {
    return client.fetch('quotation', {
      method: 'post',
      body: json(request)
    })
    .then(response => {
      return response.json();
    });
  }
}
