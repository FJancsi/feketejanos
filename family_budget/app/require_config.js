require.config({
    baseUrl: '',
    paths: {
        'app': 'app',
        'jquery': './assets/libs/jquery/dist/jquery',
        '_': './assets/libs/lodash/lodash',
        'angular': './assets/libs/angular/angular',
        'ngRoute': './assets/libs/angular-route/angular-route',
        'text': './assets/libs/text/text',
        'ngAnimate': './assets/libs/angular-animate/angular-animate'
    },
    shim: {
        'angular': {'exports': 'angular'},
        'jquery': {'exports': 'jquery'},
        'ngRoute': {'deps': ['angular']},
        'ngAnimate': {'deps': ['angular']}
    },
    priority: ['angular'],
    deps: ['app']
});

require([
        'angular',
        './app'
    ], function (angular, appModule) {
        angular.bootstrap(document.querySelector('body'), [appModule]);
    }
);
