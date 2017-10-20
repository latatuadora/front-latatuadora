import {inject} from 'aurelia-framework';
import { Static } from 'controller/static'

export class Step2 extends Static {
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
    this.styles = this.__preStyles()
    this.styles.map((style, index) => {

      if( this.model.style === style.id ) {
        this.activeIndex = index
      }
      
      this.items.push(style)

    })

  }


  isValid() {
    return typeof this.items[this.activeIndex] != 'undefined';
  }
}
