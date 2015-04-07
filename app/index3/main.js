require.config({
    baseUrl: 'app',
    urlArgs: 'v=1.0'
});

require(
    [
        'index3/anotherctrl',
        'index3/link3ctrl',
        'index3/app',
        'index3/service',
        'index3/dataservice',
        'index3/directivevalidation',
        'index3/dropdownservice',
        'index3/LocaleFileLoader',
        'index3/localrestangular',
        'index3/controller'
    ],
    function () {
        angular.bootstrap(document, ['globalAngularMod']);
    });