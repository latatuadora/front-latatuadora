import { Router } from 'aurelia-router'
import { bindable, inject } from 'aurelia-framework'

@inject( Router )
export class TattooStyle {

  @bindable style
  constructor(style, router) {
    this.router = router
    this.style = style
  }

}
