export class MenuArtist {
  constructor() {
    this.menu = [
      {
        img: 'src/assets/images/icons/group-5.png',
        text: "Mis tatuajes",
        title: ["Mis", "tatuajes"],
        route: '../../../pages/menu-page-artist/my-tattoos/my-tattoos'
      },
      {
        img: 'src/assets/images/icons/np-mustard-flower.png',
        text: "Mis flashes",
        title: ["Mis", "flashes"],
        route: '../../../pages/menu-page-artist/my-flashes/my-flashes'
      },
      {
        img: 'src/assets/images/icons/np-page.png',
        text: "Mis cotizaciones",
        title: ["Mis", "cotizaciones"],
        route: '/cotizaciones'
      },
      {
        img: 'src/assets/images/icons/np-price.png',
        text: "Posibles clientes",
        title: ["Posibles", "clientes"],
        route: '/clientes'
      },
      {
        img: 'src/assets/images/icons/np-clock.png',
        text: "Solicitudes de agendación",
        title: ["solicitudes", "de agendación"],
        route: '/agendacion'
      },
      {
        img: 'src/assets/images/icons/avatar.png',
        text: "Mis tatuadores",
        title: ["Mis", "tatuadores"],
        route: '/tattooartist'
      },
      {
        img: 'src/assets/images/icons/np-price.png',
        text: "Promocionarme",
        title: ["Promocionarme"],
        route: '/promocionarme'
      },
      {
        img: 'src/assets/images/icons/np-star.png',
        text: "evaluaciones",
        title: ["evaluaciones"],
        route: '/evaluaciones'
      }
    ];
  }
}