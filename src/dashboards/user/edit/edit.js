export class Edit {
  constructor() {
    this.maxFileSize = 5 * 1024 * 1024;
    this.fileErrors = {
      type: false,
      size: false
    };
    this.fields = {
      file: null
    };
  }

  onLoaded = (file, data) => {
    this.fields.file = {
      file: file,
      data: data
    };
    this.fileErrors.type = false;
    this.fileErrors.size = false;
  }

  onError = (file, error) => {
    if (error == 'File type does not match filter') {
      this.fileErrors.type = true;
    } else {
      this.fileErrors.size = true;
    }
  }
}