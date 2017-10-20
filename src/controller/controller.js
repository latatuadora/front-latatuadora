import {Artist} from './artist'
import {Tattoo} from './tattoo'
import {Studio} from './studio'
import {Quotation} from './quotation'
import {Address} from './address'
import {inject} from 'aurelia-framework';

@inject(Artist, Quotation, Tattoo, Studio, Address)
export class Controller {

  constructor(){

    [...arguments].map(controller => {
      this[controller.constructor.name.toLowerCase()] = controller
    })

  }

}
