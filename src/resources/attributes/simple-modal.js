import {bindable, inject} from 'aurelia-framework';
import VanillaModal from 'vanilla-modal';

@inject(Element)
export class SimpleModalCustomAttribute {
  @bindable show;
  @bindable containerId = 'modal';
  @bindable extraClass = '';
  @bindable showBelow = false;

  constructor(element) {
    this.element = element;
  }

  attached() {
    let self = this;
    let body = document.getElementsByTagName('body')[0];
    let modal = document.createElement('div');
    let exists = document.getElementById(this.containerId) ? true : false;

    if (!exists) {
      modal.classList.add('modal');
      modal.classList.add(this.extraClass);
      modal.id = this.containerId;
      modal.innerHTML = '<div class="modal-inner">' +
          '<div class="modal-content"></div>' +
        '</div>';
      body.appendChild(modal);
    }

    this.modal = new VanillaModal({
      modal: '#' + this.containerId + '.modal',
      onClose: () => {this.close(self);}
    });
  }

  showChanged(newValue, oldValue) {
    let id = this.element.id ? this.element.id : this.element.firstChild.id;
    if (oldValue != null && !newValue) {
      this.modal.close();
    } else if (newValue) {
      this.modal.open('#' + id);
    }
  }

  close(self = this) {
    self.show = false;
    self.modal.close();
  }

  detached() {
    let modal = document.getElementById(this.containerId);
    modal.parentNode.removeChild(modal);
  }
}