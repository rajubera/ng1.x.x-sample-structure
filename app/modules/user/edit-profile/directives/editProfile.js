'use strict';
/**
 * A module that exports edit profile directive
 * @module EditProfileDirective
 */
module.exports = [
    function() {
        return {
            restrict: 'A',
            template: require('../templates/edit-profile.html'),
            link: function() {

            },
            controller: 'EditProfileCtrl',
            controllerAs: 'editProfileCtrl'
        };
    }
];