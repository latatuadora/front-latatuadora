export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'La Tatuadora';
    config.map([
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: 'pages/homepage/homepage'
      }
    ]);
  }
}