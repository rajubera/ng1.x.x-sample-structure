'use strict';
/**
 * A module that exports header bar directive
 * @module HeaderbarDirective
 */
module.exports = [
    function() {
        return {
            restrict: 'E',
            template: require('./templates/headerbar.html'),
            link: function() {

            },
            controller: 'HeaderCtrl',
            controllerAs: 'headerCtrl'
        };
    }
];