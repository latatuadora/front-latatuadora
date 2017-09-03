import {inject} from 'aurelia-framework';
import {Artist} from './artist'
import {Quotation} from './quotation'
import {Tattoo} from './tattoo'
import {Studio} from './studio'

@inject(Artist, Quotation, Tattoo, Studio)
export class Controller {

  constructor(){

    [...arguments].map(controller => {
      this[controller.constructor.name.toLowerCase()] = controller
    })

  }

}
