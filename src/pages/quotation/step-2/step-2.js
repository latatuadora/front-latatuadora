import {inject} from 'aurelia-framework';
import { Tattoo } from 'controller/tattoo'

export class Step2 extends Tattoo {
  constructor() {
    super()
    this.items = [];
    this.activeIndex = 0;
  }

  activate(model) {
    this.model = model;
    this.getStyles()
  }

  changeStyle(index) {
    this.model.changeStyle(this.items[index].id);
    this.activeIndex = index;
  }

  getStyles() {
    this.styles()
      .then(styles => {

        styles.map((style, index) => {

          if( this.model.style === style.id ) {
            this.activeIndex = index
          }
          style.imgUrl = 'src/assets/images/backgrounds/featured-1.png'
          this.items.push(style)

        })


      })
      .catch(error => {
        console.warn(error)
      })
  }


  isValid() {
    return typeof this.items[this.activeIndex] != 'undefined';
  }
}
