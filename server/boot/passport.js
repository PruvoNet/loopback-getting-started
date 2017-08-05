'use strict';

module.exports = function (app) {

  var loopbackPassport = require('loopback-component-passport');
  var PassportConfigurator = loopbackPassport.PassportConfigurator;
  var passportConfigurator = new PassportConfigurator(app);
  passportConfigurator.init();
  var providers = require('./providers.json');
  passportConfigurator.setupModels({
    userModel: app.models.user,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential
  });
  for (var s in providers) {
    var c = providers[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
  }

};
