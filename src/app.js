export class App {
  configureRouter(config, router) {
    this.router = router;
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
        route: 'getTattoo',
        name: 'get_tattoo',
        moduleId: 'pages/homepage/homepage',
        title: 'Tatúate',
        nav: true
      }
    ]);
  }
}