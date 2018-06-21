'use strict';
/**
  * This is the parent listener, listenes to the rootscope event and takes action.
*/
function commonInit($rootScope, $state, $filter) {
    $rootScope.$state = $state;
    // Changes page title and class on state change
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $rootScope.pageTitleKey = toState.data.pageTitle;
            if ($rootScope.pageTitleKey) {
                $rootScope.pageTitle = $filter('translate')('appName') + ' | ' + $filter('translate')($rootScope.pageTitleKey);
            }
            $rootScope.bodyClasses = toState.data.moduleClasses + ' ' + toState.data.pageClasses;
        }
    });
    // Changes page title on language change
    $rootScope.$on('lang:changed', function() {
        if ($rootScope.pageTitleKey) {
            $rootScope.pageTitle = $filter('translate')('appName') + ' | ' + $filter('translate')($rootScope.pageTitleKey);
        }
    });
    // Redirect user to login / home page if the state change is rejected
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'loggedin') {
            if (fromState && !fromState.abstract) {
                $state.go(fromState);
            } else {
                $state.go('home');
            }
        } else {
            if (fromState && !fromState.abstract) {
                $state.go(fromState);
            } else {
                $state.go('login');
            }
        }
    });
    // Scrolls up the page on page load.
    $rootScope.$on('$viewContentLoaded', function() {
        if (document.readyState === 'complete') {
            window.scrollTo(0, 0);
        }
    });

}

commonInit.$inject = ['$rootScope', '$state', '$filter'];
module.exports = commonInit;