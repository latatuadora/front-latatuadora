import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {AuthenticateStep} from 'aurelia-authentication';
import {Session} from 'utils/session';

export class App {
  constructor(session) {
    this.errorRoute = {
      route: 'error',
      name: 'error',
      moduleId: 'pages/homepage/homepage',
      title: 'Error',
      nav: false
    };
    this.baseRoutes = [
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: 'pages/homepage/homepage',
        redirections: {
          2: 'dashboard',
          3: 'dashboard',
          others: false
        },
        title: 'Inicio',
        nav: true
      },
      {
        route: 'news',
        name: 'news',
        moduleId: 'pages/homepage/homepage',
        redirections: {
          2: 'dashboard',
          3: 'dashboard',
          others: false
        },
        title: 'News',
        nav: true
      },
      {
        route: 'inspirate/:artist?',
        name: 'inspirate',
        moduleId: 'pages/inspirate/inspirate',
        redirections: {
          2: 'dashboard',
          3: 'dashboard',
          others: false
        },
        title: 'Inspírate',
        href: '/inspirate',
        nav: true
      },
      {
        route: 'flashes/:artist?',
        name: 'flashes',
        moduleId: 'pages/flashes/flashes',
        redirections: {
          2: 'dashboard',
          3: 'dashboard',
          others: false
        },
        title: 'Flashes',
        href: '/flashes',
        nav: true
      },
      {
        route: 'buscartatuador',
        name: 'search_artist',
        moduleId: 'pages/search-artist/search-artist',
        redirections: {
          2: 'dashboard',
          3: 'dashboard',
          others: false
        },
        title: 'Busca un tatuador',
        nav: true
      },
      {
        route: 'tatuate',
        name: 'tatuate',
        moduleId: 'pages/tatuate/tatuate',
        redirections: {
          2: 'dashboard',
          3: 'dashboard',
          others: false
        },
        title: 'Tatúate',
        nav: true
      },
      {
        route: 'login',
        name: 'login',
        moduleId: 'pages/login/login',
        redirections: {
          0: false,
          others: 'dashboard'
        },
        title: 'Iniciar Sesión',
        nav: true
      },
      {
        route: 'cotizar/:artist?',
        name: 'quotation',
        moduleId: 'pages/quotation/quotation',
        redirections: {
          2: 'dashboard',
          3: 'dashboard',
          others: false
        },
        title: 'Cotiza',
        href: '/cotizar',
        nav: false
      },
      {
        route: 'cotizar/resultados',
        name: 'quotation_results',
        moduleId: 'pages/quotation-results/quotation-results',
        redirections: {
          2: 'dashboard',
          3: 'dashboard',
          others: false
        },
        title: 'Resultados de tu cotización',
        nav: false
      },
      {
        route: 'agendar/:id',
        name: 'scheduling',
        moduleId: 'pages/scheduling/scheduling',
        redirections: {
          2: 'dashboard',
          3: 'dashboard',
          others: false
        },
        title: 'Agendar',
        nav: false
      },
      {
        route: 'signup',
        name: 'signup',
        moduleId: 'pages/signup/signup',
        title: 'Regístrate',
        nav: false,
        roles: [0]
      },
      {
        route: 'estudio/:id',
        name: 'studio',
        moduleId: 'pages/artist/studio',
        title: 'Perfil de estudio',
        nav: false,
        roles: [0]
      },
      {
        route: 'mistatuajes',
        name: 'my_tattoos',
        moduleId: 'pages/menu-page-artist/my-tattoos/my-tattoos',
        title: 'Mis tatuajes',
        nav: false,
        roles: [0]
      },
      {
        route: 'misflashes',
        name: 'my_flashes',
        moduleId: 'pages/menu-page-artist/my-flashes/my-flashes',
        title: 'Mis Flashes',
        nav: false,
        roles: [0]
      },
      {
        route: 'miscotizaciones',
        name: 'my_quotations',
        moduleId: 'pages/menu-page-artist/my-quotations/my-quotations',
        title: 'Mis cotizaciones',
        nav: false,
        roles: [0]
      },
      {
        route: 'posiblesclientes',
        name: 'possible-client',
        moduleId: 'pages/menu-page-artist/possible-client/possible-client/possible-client',
        title: 'Posibles Clientes',
        nav: false,
        roles: [0]
      },
      {
        route: 'posiblesclientes/paquetes',
        name: 'leads-packages',
        moduleId: 'pages/menu-page-artist/possible-client/leads-packages/leads-packages',
        title: 'Paquetes',
        nav: false,
        roles: [0]
      },
      {
        route: 'mistatuadores',
        name: 'my-tattoo-artist',
        moduleId: 'pages/menu-page-artist/my-tattoo-artist/my-tattoo-artist',
        title: 'Mis tatuadores',
        nav: false,
        roles: [0]
      },
      {
        route: 'agendacion/solicitud',
        name: 'scheduling-request',
        moduleId: 'pages/menu-page-artist/scheduling-request/scheduling-request',
        title: 'Solicitudes de agendación',
        nav: false,
        roles: [0]
      },
      {
        route: 'editarperfil',
        name: 'edit_profile',
        moduleId: 'pages/edit-profile/edit-profile',
        title: 'Editar perfil',
        nav: false,
        roles: [0]
      },
      {
        route: 'galeriaimagen',
        name: 'image-gallery',
        moduleId: 'pages/image-gallery/image-gallery',
        title: 'Galería de imágenes del estudio',
        nav: false,
        roles: [0]
      },
      this.errorRoute
    ];
    this.sessionRoutes = [
      {
        route: 'dashboard',
        name: 'dashboard',
        nav: false,
        auth: true,
        moduleId: 'pages/homepage/homepage',
        redirections: {
          3: 'dashboard/perfil/editar'
        }
      },
      {
        route: 'dashboard/cotizaciones',
        name: 'quotations',
        moduleId: 'dashboards/user/quotations/quotations',
        title: 'Cotizaciones',
        nav: true,
        level: 1,
        auth: true,
        roles: [3]
      },
      {
        route: 'dashboard/favoritos',
        name: 'favourites',
        moduleId: 'dashboards/user/favourites/favourites',
        title: 'Me gusta',
        nav: true,
        level: 1,
        auth: true,
        roles: [3]
      },
      {
        route: 'dashboard/perfil/editar',
        name: 'edit_profile',
        moduleId: 'dashboards/user/edit/edit',
        modules: {
          1: '...',
          2: '...',
          3: '...',
          4: '...'
        },
        title: 'Editar perfil',
        nav: true,
        level: 1,
        auth: true,
        roles: [1,2,3,4]
      }
    ];
  }

  configureRouter (config, router) {
    this.router = router;

    config.addPostRenderStep(PostRenderStep);
    config.addPipelineStep('authorize', AuthenticateStep);
    config.addPipelineStep('authorize', RoleStep);
    config.addPipelineStep('authorize', PolymorphicStep);
    config.title = 'La Tatuadora';
    config.map(this.baseRoutes.concat(this.sessionRoutes));
    config.mapUnknownRoutes(this.errorRoute);
  }
}

@inject(Session)
class RoleStep {
  constructor(session) {
    this.session = session;
  }

  run(instruction, next) {
    if (instruction.config.roles) {
      let role = this.session.role.toString();
      let isAllowed = this.session.isAllowed(instruction.config.roles);
      if (!isAllowed) {
        return next.cancel(new Redirect('error'));
      }
    }
    return next();
  }
}

@inject(Session)
class PolymorphicStep {
  constructor(session) {
    this.session = session;
  }

  run(instruction, next) {
    let role = this.session.role.toString();
    if (instruction.config.redirections) {
      if (instruction.config.redirections[role] == undefined) {
        if (instruction.config.redirections.others == undefined) {
          throw new Error('There is no redirection defined for this role.');
        } else if (instruction.config.redirections.others) {
          return next.cancel(new Redirect(instruction.config.redirections.others));
        }
      } else if (instruction.config.redirections[role]) {
        return next.cancel(new Redirect(instruction.config.redirections[role]));
      }
    } else if (instruction.config.modules) {
      if (instruction.config.modules[role] == undefined) {
        throw new Error('There is no module defined for this role.');
      } else {
        instruction.config.moduleId = instruction.config.modules[role];
      }
    }
    return next();
  }
}

class PostRenderStep {
  run(instruction, next) {
    window.scrollTo(0, 0);
    return next();
  }
}