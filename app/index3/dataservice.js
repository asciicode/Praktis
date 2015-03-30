'use strict';

define(['index3/app', 'index3/service'], function (app) {

    var injectParams = ['customersService'];

    var dataService = function (customersService) {
        return customersService;
    };

    dataService.$inject = injectParams;

    app.factory('dataService', ['customersService', dataService]);

});