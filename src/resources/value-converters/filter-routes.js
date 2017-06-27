export class FilterRoutesValueConverter {
  toView(routes, level = 0, role = 0) {
    return routes.filter(route => {
      let navRole = route.config.role ? route.config.role : 0;
      let navLevel = route.config.level ? route.config.level : 0;
      return navRole == role && level == navLevel;
    });
  }
}