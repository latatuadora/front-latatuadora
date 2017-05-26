export class Step4 {
  constructor() {
    this.maxFileSize = 5 * 1024;
    this.fileValidations = [true, true];
  }

  activate(model) {
    this.model = model;
  }

  onLoaded(file, data) {
  }

  onError(file, data) {
  }

  isValid() {
    return true;
  }
}