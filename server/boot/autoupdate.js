'use strict';

module.exports = function (app) {
  var datasources = require('../datasources.json');

  function autoUpdateAll() {
    Object.keys(datasources).forEach(function (key) {
      var DS = app.dataSources[key];
      if (DS.connected) {
        DS.autoupdate(function (err) {
          if (err) throw err;
          console.log('DS ' + key + ' updated');
        });
      } else {
        DS.once('connected', function () {
          DS.autoupdate(function (err) {
            if (err) throw err;
            console.log('DS ' + key + ' updated');
          });
        });
      }
    });
  }

  autoUpdateAll();
};
