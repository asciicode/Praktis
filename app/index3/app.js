'use strict';

define(function(){
    console.log('index3app.js')
    var app = angular.module('globalAngularMod', ['ngRoute','restangular','ngTable','pascalprecht.translate']);

    return app;
});