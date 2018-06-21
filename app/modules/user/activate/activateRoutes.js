'use strict';

module.exports = ['$stateProvider', function($stateProvider) {
    $stateProvider.state({
        name: 'activate', // state name
        url: '/activate', // url path that activates this state
        template: require('./templates/activate.html'), // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
        controller: 'ActivateCtrl',
        controllerAs: 'activateCtrl',
        params: {
            email: null
        },
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
            pageClasses: 'activate', // assign a page-specific class to the <body> tag
            pageTitle: 'activateAccount' // set the title in the <head> section of the index.html file
        }
    });
}];