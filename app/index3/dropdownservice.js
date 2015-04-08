'use strict';

define(['index3/app'],
    function (app) {
    app.factory('dropDownService', ['$q','localrestangular',function($q,localrestangular){
        var returnObj = {
            getBusinessDomainList: function() {
                //console.log('gbd ', localrestangular);
                var deferred=$q.defer();
                localrestangular.one('businessdomains.json').get().then(function(response) {
                    var businessDomainList = [];
                    for (var i=0; i<response.length; i++) {
                        var bizDomain = {id:response[i].businessDomainCode, label:response[i].description};
                        businessDomainList.push(bizDomain);
                    }
                    //console.log(businessDomainList);
                    deferred.resolve(businessDomainList);
                });
                return deferred.promise;
            }
        };
        return returnObj;
    }]);

});