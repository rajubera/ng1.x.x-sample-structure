'use strict';

/**
 * This the parent application state config.
 * This config redirects to the login page if the user is not logged in
 */

function appConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get('$state');
        $state.go('login');
    });

}

appConfig.$inject = ['$urlRouterProvider'];
module.exports = appConfig;