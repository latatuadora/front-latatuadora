import fetch from 'whatwg-fetch';
import environment from './environment';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-validation')
    .plugin('aurelia-api', config => {
      config.registerEndpoint('api', 'http://sandbox.latatuadora.getmore.mx:1337/')
        .setDefaultEndpoint('api');
    })
    .plugin('aurelia-authentication', baseConfig => {
      baseConfig.configure({
        endpoint: 'api',
        loginUrl: 'login',
        loginRedirect: '#/dashboard',
        loginRoute: '#/login'
      });
    })
    .plugin('aurelia-files');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
