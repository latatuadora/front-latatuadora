import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {Session} from 'utils/session';
@inject(Session)
export class MenuUserLogged {
  @bindable baseElement;
  
  constructor(session) {
    this.session = session;
    this.menu = [
      {
        text: "Cotizaciones",
        routePage: 'preguntas/cotizaciones',
        icon: '/src/assets/images/icons/avatar.svg'
      },
      {
        text: "Me gusta",
        routePage: 'preguntas/cotizaciones',
        icon: '/src/assets/images/icons/avatar.svg'
      },
      {
        text: "Editar perfil",
        routePage: 'dashboard/perfil/editar',
        icon: '/src/assets/images/icons/avatar.svg'
      },
      {
        text: "Cerrar sesión",
        routePage: false,
        icon: '/src/assets/images/icons/avatar.svg'
      }
    ];
    this.handleClick = e => {
      this.currentElement.classList.toggle('display-inline');
    };
  }
  
  closeSession() {
    this.session.logout();
  }
  
  attached() {
    const size = 20;
    let baseElement = document.querySelector('#' + this.baseElement);
    if (!this.baseElement) {
      throw new Error('There is no base Element defined for this menu-user-logged');
    } else if (baseElement !== null) {
      let that = this;
      let currentElement = document.querySelector('menu-user-logged');
      let positionInViewportBaseElement = baseElement.getBoundingClientRect();
      this.currentElement = currentElement;
      currentElement.style.top = positionInViewportBaseElement.top + positionInViewportBaseElement.height + size + 'px';
      baseElement.addEventListener('click', this.handleClick);
      window.addEventListener('click', function (e) {
        if (that.currentElement.classList.contains('display-inline') && !e.target.dataset.hasOwnProperty('preventclose')) {
          that.currentElement.classList.remove('display-inline');
        }
      });
    }
  }
}
