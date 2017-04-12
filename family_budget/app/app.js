define([
    'angular',
    'ngRoute',
    'ngAnimate',
    'ngMaterial',
    'components/income_page/incomePage'
], function (angular, ngRoute, ngAnimate, ngMaterial, incomePage) {
    'use strict';

    return angular.module('familyBudget', [incomePage, 'ngRoute','ngAnimate','ngMaterial'])
        .config(['$compileProvider', '$routeProvider', '$locationProvider', function ($compileProvider, $routeProvider, $locationProvider) {
            $compileProvider.debugInfoEnabled(false);
            $locationProvider.hashPrefix('');

            $routeProvider
                .when('/income', {
                    template: '<fb-income-page></fb-income-page>'
                })
                .when('/outcome', {
                    template: '<div>segg</div>'
                })
                .when('/sum', {
                    template: '<div>pisa</div>'
                });
        }])
        .name;
});
