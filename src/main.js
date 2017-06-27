import fetch from 'whatwg-fetch';
import environment from './environment';

let authConfig = {
  endpoint: 'login',
  loginUrl: 'login'
};

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-validation')
    .plugin('aurelia-api', config => {
      config.registerEndpoint('login', 'http://35.161.232.194:1337/')
        .setDefaultEndpoint('login');
    })
    .plugin('aurelia-authentication', baseConfig => {
      baseConfig.configure(authConfig);
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
