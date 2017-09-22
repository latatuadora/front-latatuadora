import {BaseModal} from 'utils/base-modal';
import {Session} from 'utils/session';
import {inject} from 'aurelia-framework';
@inject(Session)
export class EditProfile extends BaseModal {
  constructor(session) {
    super();
    this.session = session;
    this.editProfile = {
      titleWhite: "Mi",
      titleGold: "Perfil"
    };
    this.description = "Llevamos la cultura del tatuaje a otro nivel. En Dalí Ink buscamos a los mejores artistas del tatuaje de todo el mundo y los traemos a México para ti. Mantente atento a nuestras fechas, agenda tu cita y lleva sobre tu piel una obra de arte.";
    this.address = "Avenida Alvaro Obregón 32, Col. Roma Norte, delegación Cuauhtemoc, C.P. 06700, CDMX.";
    this.tags = [
      {
        name: 'Old School'
      },
      {
        name: 'Machine'
      },
      {
        name: 'Geométrico'
      },
      {
        name: 'Skull'
      },
      {
        name: 'Skull'
      },
      {
        name: 'Old School'
      },
      {
        name: 'Machine'
      },
      {
        name: 'Geométrico'
      },
      {
        name: 'Skull'
      },
      {
        name: 'Skull'
      },
      {
        name: 'Old School'
      },
      {
        name: 'Machine'
      },
      {
        name: 'Geométrico'
      },
      {
        name: 'Skull'
      },
      {
        name: 'Skull'
      }
    ];
  }
  
  attached() {
    this.currentUser = this.session.getCurrentUser();
  }
}
