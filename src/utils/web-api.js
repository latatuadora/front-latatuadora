import {HttpClient} from 'aurelia-http-client';
import {MockAPI} from 'utils/mock-api';

let client = new HttpClient();

client.configure(x => {
  x.withBaseUrl('http://70.35.203.91/');
  x.withHeader('Accept', 'application/json');
});

export class WebAPI {
  getArtist = MockAPI.prototype.getArtist;

  postQuotationRequest(request) {
    return client.post('quotation', request);
  }
}
