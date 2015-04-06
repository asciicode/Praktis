'use strict';

define(['index3/app'], function (app) {
    console.log('define link3ctrl');
    app.controller('link3Ctrl', function ($scope, message, businessDomains) {
        console.log('init fxn link3ctrl ',businessDomains);
        $scope.message = message;
    });
});