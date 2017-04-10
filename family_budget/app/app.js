define([
    'angular',
    'ngRoute',
    'ngAnimate',
    'ngMaterial'
], function (angular, ngRoute, ngAnimate) {
    'use strict';

    return angular.module('familyBudget', ['ngRoute','ngAnimate','ngMaterial'])
        .config(['$compileProvider', '$routeProvider', function ($compileProvider, $routeProvider) {
            $compileProvider.debugInfoEnabled(false);

            $routeProvider
                .when('/income', {
                    template: '<div></div>'
                })
                .when('/outcome', {
                    template: '<div></div>'
                })
                .when('/sum', {
                    template: '<div></div>'
                });
        }])
        .name;
});
