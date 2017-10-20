import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class MenuArtist {
  constructor() {
    this.menu = [
      {
        img: 'src/assets/images/icons/group-5.png',
        text: "Mis tatuajes",
        title: ["Mis", "tatuajes"],
        route: '../../../pages/menu-page-artist/my-tattoos/my-tattoos',
        routePage: 'mistatuajes'
      },
      {
        img: 'src/assets/images/icons/np-mustard-flower.png',
        text: "Mis flashes",
        title: ["Mis", "flashes"],
        route: '../../../pages/menu-page-artist/my-flashes/my-flashes',
        routePage: 'misflashes'
      },
      {
        img: 'src/assets/images/icons/np-page.png',
        text: "Mis cotizaciones",
        title: ["Mis", "cotizaciones"],
        route: '/cotizaciones',
        routePage: 'miscotizaciones'
      },
      // {
      //   img: 'src/assets/images/icons/np-price.png',
      //   text: "Posibles clientes",
      //   title: ["Posibles", "clientes"],
      //   route: '/clientes',
      //   routePage: 'posiblesclientes'
      // },
      {
        img: 'src/assets/images/icons/np-clock.png',
        text: "Solicitudes de agendación",
        title: ["solicitudes", "de agendación"],
        route: '../../../menu-page-artist/scheduling-request/scheduling-request',
        routePage: 'agendacion/solicitud'
      },
      {
        img: 'src/assets/images/icons/avatar.png',
        text: "Mis tatuadores",
        title: ["Mis", "tatuadores"],
        route: '../../../menu-page-artist/my-tattoo-artist/my-tattoo-artist',
        routePage: 'mistatuadores'
      },
      // {
      //   img: 'src/assets/images/icons/np-price.png',
      //   text: "Promocionarme",
      //   title: ["Promocionarme"],
      //   route: '../../../menu-page-artist/promote-me/promote-me',
      //   routePage: 'promocionarme'
      // },
      // {
      //   img: 'src/assets/images/icons/np-star.png',
      //   text: "Evaluaciones",
      //   title: ["evaluaciones"],
      //   route: '/evaluaciones',
      //   routePage: 'evaluaciones'
      // }
    ];
  }
}
