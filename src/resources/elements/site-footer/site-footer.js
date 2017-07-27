import {inject} from 'aurelia-framework';
import {Session} from 'utils/session';
import {BaseModal} from 'utils/base-modal';

@inject(Session)
export class SiteFooter extends BaseModal {
  constructor(session) {
    super();
    this.session = session;
  }
}