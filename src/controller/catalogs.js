import { Client } from './client';

export class Catalogs extends Client {
  
  constructor() {
    super();
  }
  
  getStyles() {
    let localStyles = localStorage.getItem('styles');
    if (localStyles) {
      return JSON.parse(localStyles);
    } else {
      let that = this;
      this.simplePetition('style', 'GET')
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  
  getBodyPart() {
    let localBodyPart = localStorage.getItem('bodyParts');
    if (localBodyPart) {
      return JSON.parse(localBodyPart);
    } else {
      let that = this;
      this.simplePetition('tattoo/bodyParts', 'GET')
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
