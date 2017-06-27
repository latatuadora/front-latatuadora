export class Session {
  constructor() {
    this.getUserType();
  }

  getUserType() {
    let type = localStorage.getItem('latatuadora_com_usertype');
    if (type == null) {
      this.setUserType(0, true);
    } else {
      this.setUserType(parseInt(type), false);
    }
  }

  setUserType(type, setInStorage) {
    this.userType = type;
    if (setInStorage) {
      localStorage.setItem('latatuadora_com_usertype', type);
    }
  }
}