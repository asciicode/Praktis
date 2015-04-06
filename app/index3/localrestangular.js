'use strict';

define(['index3/app'], function (app) {
    console.log('12345')
    app.factory('localrestangular', ['Restangular', function(Restangular) {
        //console.log('543215')
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('app/json/');
        });
    }]);
});