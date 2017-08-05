'use strict';
var loopback = require('loopback');
module.exports = function enableAuthentication(app) {
  app.enableAuth();
  app.middleware('auth', loopback.token({
    model: app.models.accessToken,
    currentUserLiteral: 'me'
  }));
};

