import { Router } from 'aurelia-router'
import { bindable, inject } from 'aurelia-framework'

@inject( Router )
export class TattooStyle {

  @bindable style
  constructor(router) {
    this.router = router
  }

}
