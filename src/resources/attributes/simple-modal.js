import { bindable, inject} from 'aurelia-framework';
import VanillaModal from 'vanilla-modal';

@inject(Element)
export class SimpleModalCustomAttribute {
  @bindable show = false;
  @bindable containerId = 'modal';
  @bindable superid;

  constructor(element) {
    this.element = element;
  }

  attached() {
    let self = this;
    this.modal = new VanillaModal({
      onClose: (e) => {
        this.close(self, e);
      }
    });
  }

  showChanged(newValue, oldValue) {
    let id = this.element.id ? this.element.id : this.element.firstChild.id;
    if (this.superid !== null) {
      if (newValue && id === this.superid) {
        this.modal.open('#' + id);
      } else if (newValue === false) {
        this.modal.close('#' + id);
      }
      if (id !== this.superid) {
        document.querySelector('#' + id).style.display = 'none';
      }
    } else {
      if (newValue) {
        this.modal.open('#' + id);
      } else if (newValue === false) {
        this.modal.close('#' + id);
      }
    }
  }

  close(self = this, e) {
    if (!self.show) {
      self.modal.close();
      self.show = false;
    }
    if (typeof e === 'object') {
      self.modal.close();
      self.show = false;
    }
  }
}
