'use strict';

module.exports = ['$stateProvider', function($stateProvider) {
    $stateProvider.state({
        name: 'home', // state name
        url: '/home', // url path that activates this state
        template: require('./templates/home.html'), // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
        controller: 'HomeCtrl',
        controllerAs: 'homeCtrl',
        resolve: {
            checkLogin: function($q, userService) {
                var deferred = $q.defer();
                if (userService.isLoggedIn()) {
                    deferred.resolve();
                } else {
                    deferred.reject('notLoggedin');
                }
                return deferred.promise;
            }
        },
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'home', // assign a page-specific class to the <body> tag
            pageTitle: 'home' // set the title in the <head> section of the index.html file
        }
    });
}];