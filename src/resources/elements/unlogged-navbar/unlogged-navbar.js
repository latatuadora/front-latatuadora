import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {Menu} from 'utils/menu';

@inject(Router)
export class UnloggedNavbar {
  constructor(router) {
    this.router = router;
  }

  attached() {
    let menu = new Menu(975);
  }
}