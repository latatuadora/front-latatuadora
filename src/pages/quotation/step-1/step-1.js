export class Step1 {
  constructor () {
    this.artist = {};
  }
  
  activate(model) {
    let that = this;
    this.model = model;
    this.waitFor(function () {
      that.getInfo();
    });
  }
  
  getInfo() {
    if (this.model.artist.userType.id === 4) {
      this.name = this.model.artist.freelancer.name;
    } else {
      this.name = this.model.artist.studio.name;
    }
  }
  
  waitFor(cb) {
    let that = this, timer;
    
    timer = setInterval(function () {
      if (that.model.artist !== null) {
        clearInterval(timer);
        cb();
      }
    });
  }

  isValid() {
    return true;
  }
}
