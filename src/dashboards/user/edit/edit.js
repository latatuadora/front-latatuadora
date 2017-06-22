export class Edit {
  constructor() {
    this.maxFileSize = 5 * 1024 * 1024;
    this.fileErrors = {
      type: false,
      size: false
    };
    this.userData = {
      image: '/src/assets/images/mock/avatar.png'
    };
    this.userData.file = null;
  }

  onLoaded = (file, data) => {
    this.userData.file = {
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