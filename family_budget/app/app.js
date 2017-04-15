define([
    'angular',
    'ngRoute',
    'ngAnimate',
    'ngMaterial',
    'ngMessages',
    'ngTranslate',
    'ngCookies',
    'ngTranslateCookies',
    'ngTranslateStaticFileLoader',
    'components/income_page/incomePage'
], function (angular,
             ngRoute,
             ngAnimate,
             ngMaterial,
             ngMessages,
             ngTranslate,
             ngCookies, 
             ngTranslateCookies,
             ngTranslateStaticFileLoader,
             incomePage) {
    'use strict';

    return angular.module('familyBudget', [incomePage, 'ngRoute', 'ngAnimate', 'ngMaterial', 'ngMessages', 'pascalprecht.translate', 'ngCookies'])
        .config(['$compileProvider', '$routeProvider', '$locationProvider', '$translateProvider', function ($compileProvider, $routeProvider, $locationProvider, $translateProvider) {
            $compileProvider.debugInfoEnabled(false);
            $locationProvider.hashPrefix('');

            $translateProvider
                .useStaticFilesLoader({
                    prefix: 'assets/i18n/',
                    suffix: '.json'})
                .preferredLanguage('hu_HU')
                .useCookieStorage()
                .storageKey('lang');

            $routeProvider
                .when('/income', {
                    template: '<fb-income-page></fb-income-page>'
                })
                .when('/outcome', {
                    template: '<div></div>'
                })
                .when('/sum', {
                    template: '<div></div>'
                });
        }])
        .controller('mainCtrl', ['$scope','$translate', function($scope, $translate) {
            var vm = this;
            
            vm.setLang = setLang;
            vm.selectedLanguage = {};
            vm.languages = [
                {
                    code: 'hu_HU',
                    title: 'Magyar'
                },
                {
                    code: 'en_US',
                    title: 'English'
                }
            ];
            vm.selectedLanguage = vm.languages[0];
            
            function setLang(langKey) {
                $translate.use(langKey);
            }
        }])
        .name;
});
