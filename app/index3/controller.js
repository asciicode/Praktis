'use strict';

define(['index3/app'], function (app) {
    console.log('index3ctrl');
    //customerService.getCustomers();
    //var dataService = function (customersService) {
    //    customersService.getCustomers();
    //};
    var injectParams = ['dataService', 'customersService'];

    app.controller('allenCtrl', ['$scope', '$rootScope', 'dataService', 'customersService'
        , function ($scope, $rootScope, dataService, customersService) {
            // dataService.getCustomers();
            this.title = 'This.Title';

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

            $rootScope.$on("downloadFile", function (e, arg1, arg2) {
                console.log('fired downloadFile event ', arg1, arg2);
            });
        }]);
    app.config(['$translateProvider', function($translateProvider) {
        console.log('$translateProvider ', $translateProvider);
        $translateProvider.useLoader('$ALLENLocaleFileLoader', {});
        $translateProvider.preferredLanguage('en');
    }]);

    app.config(['$allenProvider', function($allenProvider) {
        console.log('$allenProvider ', $allenProvider);

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
            }).when("/maintainUserList", {
                templateUrl: "app/partial/link3.html",
                controller: "link3Ctrl",
                reloadOnSearch: false,
                resolve: {
                    message: function (messageService, dataService, dropDownService) {
                        console.log('resolve message invoke allen ', dropDownService);
                        return messageService.getMessage();
                    },
                    urlSearchCriteria: function($q, $location) {
                        var paramObject = _.cloneDeep($location.search());
                        var tableParams = _.pick($location.search(), 'page', 'count');
                        var searchParams = _.omit($location.search(), function(value, key) {
                            return (key=='page' || key=='count' || key=='reload' || key=='sort' || key=='dir');
                        });
                        // Massage the Sort Params, e.g. sortParams['username'] = 'desc'
                        var sortParamsFlat = _.pick($location.search(), 'sort', 'dir');
                        if (sortParamsFlat.sort) {
                            tableParams.sorting = {};
                            tableParams.sorting[sortParamsFlat.sort] = sortParamsFlat.dir;
                        }
                        return {
                            searchParams: searchParams,
                            tableParams: tableParams
                        };
                    },
                    businessDomains: function(dropDownService) {
                        return dropDownService.getBusinessDomainList();
                    }
                }
            });
        }
    ]);
});