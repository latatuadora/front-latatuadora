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
      /*{
        route: 'signup',
        name: 'signup',
        moduleId: 'pages/signup/signup',
        title: 'Regístrate',
        nav: false,
        roles: [0]
      },*/
      {
        route: 'estudio/:id',
        name: 'studio',
        moduleId: 'pages/artist/studio',
        title: 'Perfil de estudio',
        nav: false
      },
/*<<<<<<< views/B5_basic_structure_dynamic_menu_raul
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
=======*/
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