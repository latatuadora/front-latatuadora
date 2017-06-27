export class Session {
  constructor() {
    this.getUserType();
  }

  getUserType() {
    let type = localStorage.getItem('latatuadora_com_usertype');
    if (type == null) {
      this.setUserType(0);
    } else {
      this.setUserType(parseInt(type), false);
    }
  }

  setUserType(type, setInStorage = true) {
    this.userType = type;
    if (setInStorage) {
      localStorage.setItem('latatuadora_com_usertype', type);
    }
  }
}