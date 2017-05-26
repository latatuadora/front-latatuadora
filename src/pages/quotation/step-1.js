export class Step1 {
  activate(model) {
    this.model = model;
    this.general = model.artist == null ? true : false;
    this.artist = model.artist;
  }
}