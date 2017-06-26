let routers = {
  user: [
    {
      route: '',
      redirect: 'perfil/editar'
    },
    {
      route: 'cotizaciones',
      name: 'quotations',
      moduleId: 'dashboards/user/quotations/quotations',
      title: 'Cotizaciones',
      nav: true
    },
    {
      route: 'favoritos',
      name: 'favourites',
      moduleId: 'dashboards/user/favourites/favourites',
      title: 'Me gusta',
      nav: true
    },
    {
      route: 'perfil/editar',
      name: 'edit_profile',
      moduleId: 'dashboards/user/edit/edit',
      title: 'Editar perfil',
      nav: true
    }
  ],
  studio: []
};

export class Index {
  configureRouter(config, router) {
    config.map(routers.user);
    this.router = router;
  }

  bind(bindingContext, overrideContext) {
    let parent = overrideContext.parentOverrideContext.bindingContext;
    parent.sessionRouter = this.router;
  }
}