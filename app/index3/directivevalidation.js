'use strict';

define(['index3/app'], function (app) {
    var INTEGER_REGEXP = /^\-?\d+$/;
    app.directive('integer', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.integer = function (modelValue, viewValue) {
                    /*if (ctrl.$isEmpty(modelValue)) {
                     // consider empty models to be valid
                     return true;
                     }*/
                    console.log('viewValue', modelValue)
                    if (INTEGER_REGEXP.test(modelValue)) {
                        // it is valid
                        return true;
                    }

                    // it is invalid
                    return false;
                };
            }
        };
    });

    app.directive('username', function ($q, $timeout) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

                ctrl.$asyncValidators.username = function (modelValue, viewValue) {
                    console.log('username', modelValue);
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.when();
                    }

                    var def = $q.defer();

                    $timeout(function () {
                        // Mock a delayed response
                        if (usernames.indexOf(modelValue) === -1) {
                            // The username is available
                            def.resolve();
                        } else {
                            def.reject();
                        }

                    }, 2000);

                    return def.promise;
                };
            }
        };
    });

    app.directive('contenteditable', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                console.log('ctrl', ctrl);
                // view -> model
                elm.on('blur', function () {
                    console.log('1', elm.html());
                    scope.$apply(function () {
                        ctrl.$setViewValue(elm.html());
                    });
                });

                // model -> view
                ctrl.$render = function () {
                    console.log('2', ctrl.$viewValue);
                    elm.html(ctrl.$viewValue);
                };

                // load init value from DOM
                ctrl.$setViewValue(elm.html());
            }
        };
    });

    app.directive('myDomDirective', function () {
        return {
            link: function ($scope, element, attrs, ctrl) {
                element.bind('click', function () {
                    element.html('You clicked me!');
                });
                element.bind('mouseenter', function () {
                    element.css('background-color', 'yellow');
                });
                element.bind('mouseleave', function () {
                    element.css('background-color', 'white');
                });
            }
        };
    });

    app.directive('sidebox', function () {
        return {
            restrict: 'EA',
            scope: {
                title: '@'
            },
            transclude: true,
            template: '<div class="sidebox">\
                <div class="content">\
                <h2 class="header">{{ title }}</h2>\
                <span class="content" ng-transclude>\
                </span>\
                </div>\
            </div>'
        }
    });

    app.controller('MyController',
        function($scope, $interpolate) {
            $scope.to = 'ari@fullstack.ioc';
            $scope.emailBody = 'Hello {{ to }},\n\nMy name is Ari too!';
            // Set up a watch
            $scope.$watch('emailBody', function (body) {
                if (body) {
                    var tpl = $interpolate(body);
                    console.log(tpl)
                    $scope.previewText =
                        tpl({to: $scope.to});
                }
            });
        });
});