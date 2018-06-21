'use strict';
/**
 * A module that exports change password directive
 * @module EditProfileDirective
 */
module.exports = [
    function() {
        return {
            restrict: 'A',
            template: require('../templates/change-password.html'),
            link: function() {

            },
            controller: 'ChangePasswordCtrl',
            controllerAs: 'changePasswordCtrl'
        };
    }
];