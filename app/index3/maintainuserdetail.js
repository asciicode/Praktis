'use strict';

define(['index3/app'], function (app) {
    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/maintainUserDetail', {
                templateUrl: 'app/partial/maintain-user-detail.html',
                controller: 'maintainUserDetailCtrl',
                resolve: {
                    userRoles: function($q,  localrestangular) {
                        var promise = localrestangular.one('roles.json').get().then(function(returnObj) {
                            return returnObj;
                        });
                        return promise;
                    },
                    businessDomains: function(dropDownService) {
                        return dropDownService.getBusinessDomainList();
                    }
                }
            })
        }
    ]);
    app.controller('maintainUserDetailCtrl', ['$scope', '$location', '$filter', '$translate','localrestangular', 'userRoles', 'businessDomains',
            function($scope, $location, $filter, $translate, localrestangular, userRoles, businessDomains){
        console.log('$filter translate ', $translate('oms.core.common.orderTapon'));
        console.log('$filter translate ', $filter('translate')('oms.core.common.orderTapon'));

        $scope.mode = $location.search().mode? $location.search().mode : 'edit';
        $scope.username = $location.search().username;
        $scope.userRoles = userRoles;
        $scope.businessDomains=businessDomains;
        console.log('businessDomains ', businessDomains);
        var init = function() {
            localrestangular.one('user.json').get({username:$scope.username}).then(function(responseObj) {
                var currentUserRoles = responseObj.userRoles;
                _.forEach(currentUserRoles, function(role) {
                    var roleObj = _.find($scope.userRoles, {name: role.roleName});
                    if (roleObj) {
                        roleObj.checked = true;
                        roleObj.id=role.id;
                        roleObj.updateToken=role.updateToken;
                    }
                });
                $scope.user=responseObj;
            });
        }
        init();

    }]);
});