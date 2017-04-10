require.config({
    baseUrl: '',
    paths: {
        'app': 'app',
        'jquery': './assets/libs/jquery/dist/jquery',
        '_': './assets/libs/lodash/lodash',
        'angular': './assets/libs/angular/angular',
        'ngRoute': './assets/libs/angular-route/angular-route',
        'text': './assets/libs/text/text',
        'ngAnimate': './assets/libs/angular-animate/angular-animate',
        'ngAria': './assets/libs/angular-aria/angular-aria',
        'ngMessages': './assets/libs/angular-messages/angular-messages',
        'ngMaterial': './assets/libs/angular-material/angular-material'
    },
    shim: {
        'angular': {'exports': 'angular'},
        'jquery': {'exports': 'jquery'},
        'ngRoute': {'deps': ['angular']},
        'ngAnimate': {'deps': ['angular']},
        'ngAria': ['angular'],
        'ngMessages': ['angular'],
        'ngMaterial': {
            deps: ['ngAnimate', 'ngAria', 'ngMessages']
        }
    },
    priority: ['angular'],
    deps: ['app']
});

require([
        'angular',
        './app'
    ], function (angular, app) {
        angular.bootstrap(document.querySelector('body'), [app]);
    }
);
