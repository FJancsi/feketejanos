define([
    'angular',
    'ngRoute',
    'ngAnimate'
], function (angular, ngRoute, ngAnimate) {
    'use strict';

    return angular.module('spaApp', ['ngRoute','ngAnimate'])
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
                })
                .otherwise({
                    template: '<div></div>'
                });
        }])
        .name;
});
