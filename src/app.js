export class App {
  configureRouter (config, router) {
    var postRender = new PostRenderStep()
    this.router = router

    config.addPostRenderStep(postRender)
    config.title = 'La Tatuadora'
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
        route: 'inspirate',
        name: 'inspirate',
        moduleId: 'pages/inspirate/inspirate',
        title: 'Inspírate',
        nav: true
      },
      {
        route: 'buscartatuador',
        name: 'search_artist',
        moduleId: 'pages/homepage/homepage',
        title: 'Busca un tatuador',
        nav: true
      },
      {
        route: 'login',
        name: 'login',
        moduleId: 'pages/login/login',
        title: 'Iniciar Sesión',
        nav: false
      },
      {
        route: 'tatto',
        name: 'tatto',
        moduleId: 'pages/tatto/tatto',
        title: 'Tatuate',
        nav: true
      }
    ])
  }
}

class PostRenderStep {
  run (instruction, next) {
    window.scrollTo(0, 0)
    return next()
  }
}
