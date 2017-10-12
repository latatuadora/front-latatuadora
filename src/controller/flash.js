import { Client } from './client';

export class Flash extends Client {
  
  /**
   *@PUBLIC constructor
   *@DESCRIPTION define endpoint
   **/
  constructor() {
    super();
  }
  
  /**
   *@PUBLIC get
   *@DESCRIPTION get tattoo(s) not/approved tattos, approved can be filter
   **/
  get(id) {
    let that = this;
    return new Promise (function(accept, reject) {
      let url = 'flash/studio/' + id;
      return that.simplePetition(url, 'GET', null)
        .then(data => accept(data))
        .catch(error => reject(error));
    });
  }
  
  add(flash) {
    let that = this;
    return new Promise (function(accept, reject) {
      return that.simpleNativePetition('flash', 'POST', flash, function(success, error) {
        if (success) {
          accept(success);
        } else {
          reject(error);
        }
      });
    });
  }

}
