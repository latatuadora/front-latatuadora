import { Client } from './client';

export class Artist extends Client {

  constructor() {
    super();
    this.endpoint = 'artist';
  }

  artist(id) {
    const url = this.URL(this.endpoint, `${id}`);
    return this.client
      .fetch(`${url}`, {
        method: this.methods.get
      })
      .then(response => response.json())
      .then(artist => {
        return artist;
      })
      .catch(error => {
        return error;
      });
  }
  
  get(artistId) {
    let that = this;
    return new Promise(function (accept, reject) {
      return that.simpleNativePetition('artist/' + artistId, 'GET', null, function(success, error) {
        if (success) {
          accept(JSON.parse(success));
        } else {
          reject(error);
        }
      });
    });
  }
  
  getArtists(artistId) {
    let that = this;
    return new Promise(function (accept, reject) {
      return that.simpleNativePetition('studio/getArtists/' + artistId, 'GET', null, function(success, error) {
        if (success) {
          accept(JSON.parse(success).artists);
        } else {
          reject(error);
        }
      });
    });
  }

  find(params) {
    const url = this.URL(this.endpoint, params);
    return this.client
      .fetch(`${url}`, {
        method: this.methods.get
      })
      .then(response => response.json())
      .then(artist => {
        return artist;
      })
      .catch(error => {
        return error;
      });
  }
  
  add(artist) {
    let that = this;
    return new Promise (function(accept, reject) {
      return that.simpleNativePetition('artist', 'POST', artist, function(success, error) {
        if (success) {
          accept(success);
        } else {
          reject(error);
        }
      });
    });
  }
  
  edit(artist) {
    let that = this;
    return new Promise (function(accept, reject) {
      return that.simpleNativePetition('artist', 'PUT', artist, function(success, error) {
        if (success) {
          accept(success);
        } else {
          reject(error);
        }
      });
    });
  }

}
