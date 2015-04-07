'use strict';

define(['index3/app'], function (app) {
    console.log('define link3ctrl');
    app.controller('link3Ctrl', function ($scope, $location, message, urlSearchCriteria, businessDomains, ngTableParams, localrestangular) {
        $scope.searchCriteria = {};
        $scope.availBusinessDomains = businessDomains;
        //console.log('init fxn link3ctrl ',urlSearchCriteria);
        $scope.message = message;

        var tableParamGetData = function($defer, params) {
            console.log('tableParamGetData',params)
            $scope.isLoading = true;
            // Update the URL
            var sortingParams = _.pairs(params.sorting());
            var urlParams = {
                page: params.page(),
                count: params.count(),
                sort: sortingParams[0][0],
                dir: sortingParams[0][1]
            };

            if(_.isEmpty($scope.searchCriteria.username)){
                delete $scope.searchCriteria.username;
            }
            console.log('urlParams 1 ', urlParams);
            angular.extend(urlParams, _.cloneDeep($scope.searchCriteria), {
                reload:false
            });
            console.log('urlParams 2 ', urlParams);
            $location.search(urlParams);

            // Construct the URL Param
            var httpGetParams = {
                page : params.page() - 1,
                size : params.count(),
                sort : _.pairs(params.sorting()).join()
            };
            angular.extend(httpGetParams, $scope.searchCriteria);

            // send request to Server Side
            localrestangular.one('users.json').get(httpGetParams).then(function(returnObj) {

                var response = returnObj.content;
                _.forEach(returnObj.content, function(user) {
                    var profile =  user.userProfile;
                    var businessDomainObj =  _.find($scope.availBusinessDomains, {id:profile.businessDomainCode});
                    profile.businessDomainCodeDesc=businessDomainObj.label;
                });
                console.log('users.json ',response)
                $defer.resolve(response.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                $scope.isLoading=false;
                //data.slice((params.page() - 1) * params.count(), params.page() * params.count())
                params.total(returnObj.totalElements);
            });
        }

        var init = function() {
            console.log('init ');
            // Fill up the criteria if it is Array type
            var localSearchCriteria = urlSearchCriteria.searchParams;
            var keys = _.keys(localSearchCriteria);
            _.forEach(keys, function(key) {
                if (_.isArray($scope.searchCriteria[key]) && !_.isArray(localSearchCriteria[key])) {
                    $scope.searchCriteria[key] = [localSearchCriteria[key]];
                } else {
                    $scope.searchCriteria[key] = localSearchCriteria[key];
                }
            });

            // Init the Table Param
            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 3,
                sorting : {
                    lastUpdatedDate : 'asc' // initial sorting
                }
            }, {
                total: 0,
                getData: tableParamGetData
                //getData: {}
            });
            //$scope.tableParams.parameters(urlSearchCriteria.tableParams, true);
        }
        init();
    });
});