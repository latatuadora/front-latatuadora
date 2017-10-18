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
        route: 'http://latatuadora.com/blog/',
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
        nav: false
      },
      {
        route: 'buscartatuador',
        name: 'search_artist',
        moduleId: 'pages/search-artist/search-artist',
        /*redirections: {
          2: 'dashboard',
          3: 'dashboard',
          others: false
        },*/
        title: 'Busca un tatuador',
        roles: [0],
        nav: false
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
        nav: false
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
        nav: true
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
        route: 'agendar/:id?',
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
        route: 'signup/user',
        name: 'signup-user',
        moduleId: 'pages/signup/user/user',
        title: 'Regístrate',
        nav: false,
        roles: [0]
      },
      {
        route: 'estudio/:id?',
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
        roles: [3]
      },
      {
        route: 'misflashes',
        name: 'my_flashes',
        moduleId: 'pages/menu-page-artist/my-flashes/my-flashes',
        title: 'Mis Flashes',
        nav: false,
        roles: [3]
      },
      {
        route: 'miscotizaciones',
        name: 'my_quotations',
        moduleId: 'pages/menu-page-artist/my-quotations/my-quotations',
        title: 'Mis cotizaciones',
        nav: false,
        roles: [3]
      },
      {
        route: 'posiblesclientes',
        name: 'possible-client',
        moduleId: 'pages/menu-page-artist/possible-client/possible-client/possible-client',
        title: 'Posibles Clientes',
        nav: false,
        roles: [3]
      },
      {
        route: 'posiblesclientes/paquetes',
        name: 'leads-packages',
        moduleId: 'pages/menu-page-artist/possible-client/leads-packages/leads-packages',
        title: 'Paquetes',
        nav: false,
        roles: [3]
      },
      {
        route: 'posiblesclientes/pagos',
        name: 'leads-payment',
        moduleId: 'pages/menu-page-artist/possible-client/leads-payment/leads-payment',
        title: 'Pago',
        nav: false,
        roles: [3]
      },
      {
        route: 'posiblesclientes/conekta',
        name: 'payment-conkecta',
        moduleId: 'pages/menu-page-artist/possible-client/payment-conekta/payment-conekta',
        title: 'Pago - Conekta',
        nav: false,
        roles: [3]
      },
      {
        route: 'mistatuadores',
        name: 'my-tattoo-artist',
        moduleId: 'pages/menu-page-artist/my-tattoo-artist/my-tattoo-artist',
        title: 'Mis tatuadores',
        nav: false,
        roles: [3]
      },
      {
        route: 'promocionarme',
        name: 'promote-me',
        moduleId: 'pages/menu-page-artist/promote-me/promote-me/promote-me',
        title: 'Promocionarme',
        nav: false,
        roles: [3]
      },
      {
        route: 'promocionarme/blogspot',
        name: 'promote-me-blog',
        moduleId: 'pages/menu-page-artist/promote-me/blogspot/blogspot',
        title: 'Promocionarme',
        nav: false,
        roles: [3]
      },
      {
        route: 'evaluaciones',
        name: 'evaluations',
        moduleId: 'pages/menu-page-artist/evaluations/evaluations',
        title: 'Evaluaciones',
        nav: false,
        roles: [3]
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
        roles: [3]
      },
      {
        route: 'galeriaimagen',
        name: 'image-gallery',
        moduleId: 'pages/image-gallery/image-gallery',
        title: 'Galería de imágenes del estudio',
        nav: false,
        roles: [0]
      },
      {
        route: 'news',
        name: 'news-blog',
        moduleId: 'pages/news-blog/news-blog',
        title: 'News Blog',
        nav: false,
        roles: [0]
      },
      {
        route: 'preguntas/cotizaciones',
        name: 'question-quotation',
        moduleId: 'pages/frecuent-questions/question-quotation/question-quotation',
        title: 'Preguntas - Cotizaciones',
        nav: false,
        roles: [0]
      },
      {
        route: 'politicaprivacidad',
        name: 'notice-privacy',
        moduleId: 'pages/notice-privacy/notice-privacy',
        title: 'Política de Privacidad',
        nav: false,
        roles: [0]
      },
      {
        route: 'nosotros',
        name: 'about-us',
        moduleId: 'pages/about-us/about-us',
        title: 'Acerca de nosotros',
        nav: false,
        roles: [0]
      },
      {
        route: 'contacto',
        name: 'contact',
        moduleId: 'pages/contact/contact',
        title: 'Contacto',
        nav: false,
        roles: [0]
      },
      {
        route: 'buscar',
        name: 'search-tatuadora',
        moduleId: 'pages/search-tatuadora/search-tatuadora',
        title: 'Buscar',
        nav: false,
        roles: [0]
      },
      {
        route: 'comofunciona',
        name: 'how-it-work',
        moduleId: 'pages/how-it-work/how-it-work',
        title: '¿Cómo funciona?',
        nav: false,
        roles: [0]
      },
      {
        route: 'estudiosfavoritos',
        name: 'favorite-studies',
        moduleId: 'pages/favorite-studies/favorite-studies',
        title: 'Estudios Favoritos',
        nav: false,
        roles: [0]
      },
      {
        route: 'agendacion/solicitud/perfil',
        name: 'scheduling-request-profile',
        moduleId: 'pages/scheduling-request-profile/scheduling-request-profile',
        title: 'Solicitudes de agendación - Perfil',
        nav: false,
        roles: [0]
      },
      {
        route: 'comprar/flash',
        name: 'buy-flash',
        moduleId: 'pages/buy-flash/buy-flash',
        title: 'Comprar flash',
        nav: false,
        roles: [0]
      },
      {
        route: 'comprar/flash/conekta',
        name: 'payment-flash-conekta',
        moduleId: 'pages/payment-flash-conekta/payment-flash-conekta',
        title: 'Pago flash Conekta',
        nav: false,
        roles: [0]
      },
      {
        route: 'registro/pago',
        name: 'signup-payment',
        moduleId: 'pages/signup-payment/signup-payment',
        title: 'Registro - Pago',
        nav: false,
        roles: [0]
      },
      {
        route: 'registro/pago/conekta',
        name: 'signup-payment-conekta',
        moduleId: 'pages/signup-payment-conekta/signup-payment-conekta',
        title: 'Registro - Pago Conekta',
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
          1: 'dashboard/perfil/editar',
          2: 'dashboard/perfil/editar',
          3: 'miscotizaciones'
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
        name: 'edit_profile_user',
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
        roles: [1, 2, 3, 4]
      }
    ];
  }
  
  configureRouter(config, router) {
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
      if (instruction.config.redirections[role] === undefined) {
        if (instruction.config.redirections.others === undefined) {
          throw new Error('There is no redirection defined for this role.');
        } else if (instruction.config.redirections.others) {
          return next.cancel(new Redirect(instruction.config.redirections.others));
        }
      } else if (instruction.config.redirections[role]) {
        return next.cancel(new Redirect(instruction.config.redirections[role]));
      }
    } else if (instruction.config.modules) {
      if (instruction.config.modules[role] === undefined) {
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
