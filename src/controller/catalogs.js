import { Client } from './client';

export class Catalogs extends Client {
  
  constructor() {
    super();
  }
  
  getCatalogStyles() {
    let localStyles = localStorage.getItem('styles');
    if (localStyles) {
      return JSON.parse(localStyles);
    } else {
      let that = this;
      this.simplePetition('style', 'GET')
        .then(data => {
          localStorage.setItem('styles', JSON.stringify(data));
          return JSON.parse(data);
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
  
  getCatalogBodyPart() {
    let localBodyPart = localStorage.getItem('bodyParts');
    if (localBodyPart) {
      return JSON.parse(localBodyPart);
    } else {
      let that = this;
      this.simplePetition('tattoo/bodyParts', 'GET')
        .then(data => {
          localStorage.setItem('bodyParts', JSON.stringify(data));
          return JSON.parse(data);
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
  
  getCatalogElements() {
    let localBodyPart = localStorage.getItem('elements');
    if (localBodyPart) {
      return JSON.parse(localBodyPart);
    } else {
      let that = this;
      this.simplePetition('elements', 'GET')
        .then(data => {
          localStorage.setItem('elements', JSON.stringify(data.elements));
          return JSON.parse(data.elements);
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
  
  getInitialData() {
    this.getCatalogBodyPart();
    this.getCatalogStyles();
    this.getCatalogElements();
  }
}
