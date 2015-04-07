'use strict';

define(['index3/app'], function(app) {
  console.log('LocalFileLoader');
  app.factory('$ALLENLocaleFileLoader', ['$q','localrestangular', function ($q, localrestangular) {
      return function (options) {
        return localrestangular.one(options.key+'.json').get();
      };
    }
  ]);
});