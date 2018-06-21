'use strict';

module.exports = ['$stateProvider', function($stateProvider) {
    $stateProvider.state({
        name: 'reset-password', // state name
        url: '/reset-password', // url path that activates this state
        template: require('./templates/reset-password.html'), // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
        controller: 'ResetPasswordCtrl',
        controllerAs: 'resetPasswordCtrl',
        params: {
            email: null
        },
        resolve: {
            checkLogin: function($q, userService) {
                var deferred = $q.defer();
                if (userService.isLoggedIn()) {
                    deferred.reject('loggedin');
                } else {
                    deferred.resolve();
                }
                return deferred.promise;
            }
        },
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'reset-password', // assign a page-specific class to the <body> tag
            pageTitle: 'resetPassword' // set the title in the <head> section of the index.html file
        }
    });
}];