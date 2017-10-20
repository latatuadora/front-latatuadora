import {BaseModal} from 'utils/base-modal';
import {Schedule} from 'controller/schedule';
import {inject} from 'aurelia-framework';

@inject( Schedule)
export class SchedulingRequest extends BaseModal {
  constructor(schedule) {
    super();
    this.schedule = schedule;
    this.title = ["Mis", "Agendaciones"];
  }
  
  async attached() {
    let that = this;
    this.schedule = await this.schedule.get();
  }
}
