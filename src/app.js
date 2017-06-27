import {inject} from 'aurelia-framework';
import {Session} from 'utils/session';

@inject(Session)
export class App {
  constructor(session) {
    this.session = session;
    this.baseRoutes = [
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
      /*{
        route: 'signup',
        name: 'signup',
        moduleId: 'pages/signup/signup',
        title: 'Regístrate',
        nav: false
      },*/
      {
        route: 'estudio/:id',
        name: 'studio',
        moduleId: 'pages/artist/studio',
        title: 'Perfil de estudio',
        nav: false
      },
      {
        route: 'error',
        name: 'error',
        moduleId: 'pages/homepage/homepage',
        title: 'Error',
        nav: false
      }
    ];
    this.sessionRoutes = [
      {
        route: 'dashboard',
        redirects: {
          1: 'perfil/editar'
        },
        nav: false,
        role: 1,
        navigationStrategy: this.rolesStrategy
      },
      {
        route: 'cotizaciones',
        name: 'quotations',
        moduleId: 'dashboards/user/quotations/quotations',
        title: 'Cotizaciones',
        nav: true,
        level: 1,
        role: 1,
        navigationStrategy: this.rolesStrategy
      },
      {
        route: 'favoritos',
        name: 'favourites',
        moduleId: 'dashboards/user/favourites/favourites',
        title: 'Me gusta',
        nav: true,
        level: 1,
        role: 1,
        navigationStrategy: this.rolesStrategy
      },
      {
        route: 'perfil/editar',
        name: 'edit_profile',
        moduleId: 'dashboards/user/edit/edit',
        title: 'Editar perfil',
        nav: true,
        level: 1,
        role: 1,
        navigationStrategy: this.rolesStrategy
      }
    ];
  }

  configureRouter (config, router) {
    let postRender = new PostRenderStep();
    this.router = router;

    config.addPostRenderStep(postRender);
    config.title = 'La Tatuadora';
    config.map(this.baseRoutes.concat(this.sessionRoutes));
  }

  rolesStrategy = (instruction) => {
    let type = this.session.userType.toString();
    let isAllowed = this.session.typeMatches(instruction.config.role);

    if (isAllowed) {
      if (instruction.config.redirects) {
        if (instruction.config.redirects[type] == undefined) {
          throw new Error('There is no redirection defined for this role.');
        }
        instruction.config.redirect = instruction.config.redirects[type];
      } else if (instruction.config.modules) {
        if (instruction.config.modules[type] == undefined) {
          throw new Error('There is no module defined for this role.');
        }
        instruction.config.moduleId = instruction.config.modules[type];
      }
    } else {
      instruction.config.redirect = 'error';
    }
  }
}

class PostRenderStep {
  run (instruction, next) {
    window.scrollTo(0, 0);
    return next();
  }
}
