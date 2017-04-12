define([
    'angular',
    './incomePageController'
], function (angular, incomePageController) {
    return angular.module('familyBudget.incomePage', [])
        .component('fbIncomePage', {
            controller: incomePageController,
            controllerAs: 'vm',
            templateUrl: 'components/income_page/incomePage.html',
            bindings: {}
        })
        .name;
});