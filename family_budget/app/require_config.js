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
        'ngMaterial': './assets/libs/angular-material/angular-material',
        'ngTranslate': './assets/libs/angular-translate/angular-translate',
        'ngCookies': './assets/libs/angular-cookies/angular-cookies',
        'ngTranslateCookies': './assets/libs/angular-translate-storage-cookie/angular-translate-storage-cookie',
        'ngTranslateStaticFileLoader': './assets/libs/angular-translate-loader-static-files/angular-translate-loader-static-files'
    },
    shim: {
        'angular': {'exports': 'angular'},
        'jquery': {'exports': 'jquery'},
        'ngRoute': {'deps': ['angular']},
        'ngAnimate': {'deps': ['angular']},
        'ngAria': ['angular'],
        'ngMessages': ['angular'],
        'ngMaterial': {'deps': ['ngAnimate', 'ngAria', 'ngMessages']},
        'ngTranslate' : {'deps': ['angular']},
        'ngCookies': {'deps': ['angular']},
        'ngTranslateCookies': {'deps': ['ngTranslate', 'ngCookies']},
        'ngTranslateStaticFileLoader' : {'deps': ['ngTranslate']}
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
