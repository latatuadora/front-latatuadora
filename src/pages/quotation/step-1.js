export class Step1 {
  activate(model) {
    this.general = model == null ? true : false;
    this.model = model;
  }
}