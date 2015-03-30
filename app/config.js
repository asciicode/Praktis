require.config({
    paths: {
        'angular' : '../assets/libs/angular',
        'app' : 'app',
        'coreModule' : 'coreModule'
    },
    shim: {
        'app' : {
            deps : ['angular', 'coreModule']
        },
        'coreModule' : {
            deps : ['angular']
        }
    }
})

require(['app'], function(){
    angular.bootstrap(document, ['app']);
});