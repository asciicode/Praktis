'use strict';

define(function() {
    console.log('coreModule');
    var coreModule = angular.module('coreModule', []);
    coreModule.controller('allenCtrl', function($scope) {
        $scope.title = 'cez sn0rt';

        $scope.$watch('textMe', function(newValue, oldValue) {
            console.log('allen text me');
        });
    });

});