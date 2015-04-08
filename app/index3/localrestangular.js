'use strict';

define(['index3/app'], function (app) {
    app.factory('localrestangular', ['Restangular', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('app/json/');
        });
    }]);
});