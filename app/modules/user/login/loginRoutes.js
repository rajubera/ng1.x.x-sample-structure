'use strict';

module.exports = ['$stateProvider', function($stateProvider) {
    $stateProvider.state({
        name: 'login', // state name
        url: '/login', // url path that activates this state
        template: require('./templates/login.html'), // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl',
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
            pageClasses: 'login', // assign a page-specific class to the <body> tag
            pageTitle: 'login' // set the title in the <head> section of the index.html file
        }
    });
}];