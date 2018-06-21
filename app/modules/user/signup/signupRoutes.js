'use strict';

module.exports = ['$stateProvider', function($stateProvider) {
    $stateProvider.state({
        name: 'signup', // state name
        url: '/signup', // url path that activates this state
        template: require('./templates/signup.html'), // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
        controller: 'SignupCtrl',
        controllerAs: 'signupCtrl',
        resolve: {
            checkLogin: function($q, userService) {
                var deferred = $q.defer();
                if (!userService.isLoggedIn()) {
                    deferred.resolve();
                } else {
                    deferred.reject('loggedin');
                }
                return deferred.promise;
            }
        },
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'signup', // assign a page-specific class to the <body> tag
            pageTitle: 'signup' // set the title in the <head> section of the index.html file
        }
    });
}];