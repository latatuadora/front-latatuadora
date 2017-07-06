export class App {
  configureRouter (config, router) {
    var postRender = new PostRenderStep();
    this.router = router;

    config.addPostRenderStep(postRender);
    config.title = 'La Tatuadora';
    config.map([
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: 'pages/homepage/homepage',
        title: 'Inicio',
        nav: true
      },
      {
        route: 'news',
        name: 'news',
        moduleId: 'pages/homepage/homepage',
        title: 'News',
        nav: true
      },
      {
        route: 'inspirate/:artist?',
        name: 'inspirate',
        moduleId: 'pages/inspirate/inspirate',
        title: 'Inspírate',
        href: '/inspirate',
        nav: true
      },
      {
        route: 'flashes/:artist?',
        name: 'flashes',
        moduleId: 'pages/flashes/flashes',
        title: 'Flashes',
        href: '/flashes',
        nav: true
      },
      {
        route: 'buscartatuador',
        name: 'search_artist',
        moduleId: 'pages/search-artist/search-artist',
        title: 'Busca un tatuador',
        nav: true
      },
      {
        route: 'tatuate',
        name: 'tatuate',
        moduleId: 'pages/tatuate/tatuate',
        title: 'Tatúate',
        nav: true
      },
      {
        route: 'login',
        name: 'login',
        moduleId: 'pages/login/login',
        title: 'Iniciar Sesión',
        nav: true
      },
      {
        route: 'cotizar/:artist?',
        name: 'quotation',
        moduleId: 'pages/quotation/quotation',
        title: 'Cotiza',
        href: '/cotizar',
        nav: false
      },
      {
        route: 'cotizar/resultados',
        name: 'quotation_results',
        moduleId: 'pages/quotation-results/quotation-results',
        title: 'Resultados de tu cotización',
        nav: false
      },
      {
        route: 'agendar/:id',
        name: 'scheduling',
        moduleId: 'pages/scheduling/scheduling',
        title: 'Agendar',
        nav: false
      },
      {
        route: 'signup',
        name: 'signup',
        moduleId: 'pages/signup/signup',
        title: 'Regístrate',
        nav: false
      },
      {
        route: 'estudio/:id',
        name: 'studio',
        moduleId: 'pages/artist/studio',
        title: 'Perfil de estudio',
        nav: false
      },
      {
        route: 'mistatuajes',
        name: 'my_tattoos',
        moduleId: 'pages/menu-page-artist/my-tattoos/my-tattoos',
        title: 'Mis tatuajes',
        nav: false
      },
      {
        route: 'misflashes',
        name: 'my_flashes',
        moduleId: 'pages/menu-page-artist/my-flashes/my-flashes',
        title: 'Mis Flashes',
        nav: false
      },
      {
        route: 'miscotizaciones',
        name: 'my_quotations',
        moduleId: 'pages/menu-page-artist/my-quotations/my-quotations',
        title: 'Mis cotizaciones',
        nav: false
      },
      {
        route: 'editarperfil',
        name: 'edit_profile',
        moduleId: 'pages/edit-profile/edit-profile',
        title: 'Editar perfil',
        nav: false
      }
    ]);
  }
}

class PostRenderStep {
  run (instruction, next) {
    window.scrollTo(0, 0);
    return next();
  }
}