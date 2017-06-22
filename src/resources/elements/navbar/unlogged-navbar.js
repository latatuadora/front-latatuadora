import {inject, bindable} from 'aurelia-framework';
import {Menu} from 'utils/menu';

@inject(Router)
export class Navbar {
  @bindable sessionRouter;

  constructor(router) {
    this.router = router;
  }

  attached() {
    let menu = new Menu(975);
  }
}