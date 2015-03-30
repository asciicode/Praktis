require.config({
    baseUrl: 'app',
    urlArgs: 'v=1.0'
});

require(
    [
        'index3/controller',
        'index3/anotherctrl',
        'index3/app',
        'index3/service',
        'index3/dataservice',
        'index3/directivevalidation'
    ],
    function () {
        angular.bootstrap(document, ['globalAngularMod']);
    });