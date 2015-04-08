angular.module('allen.provider', ['ng']).run([
    '$allen',
    function ($allen) {

    }
]);

angular.module('allen.provider').provider('$allen', [
    function () {
        var fxn = {};
        this.$get = [
            '$log',
            '$injector',
            '$rootScope',
            '$q',
            function ($log, $injector, $rootScope, $q) {
                var Storage, pendingLoader = false, interpolatorHashMap = {};
                console.log('allen.provider');
            }
        ];
    }
]);