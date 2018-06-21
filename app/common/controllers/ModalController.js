'use strict';
/**
 * A module that exports the modal controller
 * This controller handles the actions performed on the popups.
 * @module ModalController
 */

module.exports = ['$scope', '$uibModalInstance',
    function($scope, $uibModalInstance) {
        var me = this;
        angular.extend(me, {
            init: function() {
                me.initScope();
            },
            initScope: function() {
            }
        }).init();
        $scope.$on('close:modal', function() {
            $uibModalInstance.close();
        });
    }
];