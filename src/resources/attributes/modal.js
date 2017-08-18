import { bindable, inject } from 'aurelia-framework'
import  VanillaModal  from 'vanilla-modal'

export class ModalCustomAttribute {

  static inject = [Element];
  template = `
    <div class="modal">
      <div class="modal-inner">
        <div class="modal-content"></div>
      </div>
    </div>
  `

  constructor(element) {
    this.element = element
  }

  attached() {

    this.element.classList.add('modal-hide')
    this.element.insertAdjacentHTML('afterend',this.template)
    document.querySelectorAll(`[href^="#${this.element.id}"]`).forEach((element) => {
      element.dataset.modalOpen = true
    })

    this.modal = new VanillaModal()
  }
}
