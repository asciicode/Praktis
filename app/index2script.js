angular.
    module('phonecatApp', []).
    controller('MyController', ['$scope','notifyYou', function ($scope, notifyMe) {
       $scope.callNotify = function(msg) {
           notifyMe(msg);
        };
    }]).
    factory('notifyYou', ['$window', function(win) {
        var msgs = [];
        return function(msg) {
            msgs.push(msg);
            if (msgs.length == 3) {
                win.alert(msgs.join("\n"));
                msgs = [];
            }
        };
    }]);