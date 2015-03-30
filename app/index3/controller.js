'use strict';

define(['index3/app'], function (app) {
    console.log('index3ctrl');
    //customerService.getCustomers();
    //var dataService = function (customersService) {
    //    customersService.getCustomers();
    //};
    var injectParams = ['dataService', 'customersService'];

    app.controller('allenCtrl', ['$scope', 'dataService', 'customersService'
        , function ($scope, dataService, customersService) {
            // dataService.getCustomers();
            this.title = 'this title';

            getCustomers();
            function getCustomers() {
                customersService.getLinks()
                    .success(function (data) {
                        $scope.links = data;
                    })
                    .error(function (error) {
                        $scope.title = 'Unable to load customer data: ' + error.message;
                    });
            }
        }]);

    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/phone', {
                templateUrl: 'app/partial/link1.html',
                controller: 'anotherCtrl',
                resolve: {

                }
            }).when('/directiveValidation', {
                templateUrl: 'app/partial/link2.html',
                controller: 'anotherCtrl',
                resolve: {

                }
            });
        }
    ]);
});