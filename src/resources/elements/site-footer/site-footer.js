import {inject} from 'aurelia-framework';
import {Session} from 'utils/session';

@inject(Session)
export class SiteFooter {
  constructor(session) {
    this.session = session;
  }
}