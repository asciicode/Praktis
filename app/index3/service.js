'use strict';

define(['index3/app'], function (app) {
    var injectParams = ['$http', '$q'];

    var customersFactory = function ($http, $q) {
        var factory = {};
        factory.getCustomers = function (){
            console.log('getCustomers');
        }
        factory.getLinks = function (){
            return $http.get('app/json/link.json');
            // return [];
        }
        return factory;
    };
    customersFactory.$inject = injectParams;

    app.factory('customersService', customersFactory);

    app.factory('messageService', function($q){
        return {
            getMessage: function(){
                return $q.when("Hello World!");
            }
        };
    });
});