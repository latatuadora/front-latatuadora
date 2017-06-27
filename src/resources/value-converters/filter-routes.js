export class FilterRoutesValueConverter {
  toView(routes, level = 0, role = 0) {
    return routes.filter(route => {
      let navRole = route.config.role ? route.config.role : 0;
      let navLevel = route.config.level ? route.config.level : 0;
      let roleMatches;

      if (Array.isArray(navRole)) {
        roleMatches = navRole.indexOf(role) != -1;
      } else {
        roleMatches = navRole == role;
      }
      
      return roleMatches && level == navLevel;
    });
  }
}