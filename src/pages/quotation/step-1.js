export class Step1 {
  activate(artist) {
    this.general = artist == null ? true : false;
    this.artist = artist;
  }
}