'use strict';
/**
 * A module that changes user's password
 * @module ChangePasswordController
 */

module.exports = ['$scope', '$filter', 'userService',
    function($scope, $filter, userService) {
        var me = this;
        angular.extend(me, {
            init: function() {
                me.initScope();
            },
            initScope: function() {
                me.fields = {};
                me.isLoadingUser = true;
                userService.getUserData().then(function() {
                    delete me.isLoadingUser;
                }, function() {
                    delete me.isLoadingUser;
                });
            },
            backToDashboard: function() {
                me.closeModal();
            },
            /**
             * @function changePassword
             * @description This method calls cognito service to changes the user's password
             */
            changePassword: function(changePasswordForm, fields) {
                changePasswordForm.$setSubmitted();
                console.log('ng -submit =', changePasswordForm, fields);
                if (!changePasswordForm.$valid) {
                    return;
                }
                me.isLoading = true;
                delete me.errorMsg;
                userService.changePassword(me.fields).then(function() {
                    me.isLoading = false;
                    me.closeModal();
                }, function(error) {
                    console.log(error);
                    if (error && error.message) {
                        me.errorMsg = error.message;
                    } else {
                        me.errorMsg = $filter('translate')('defaultError');
                    }
                    me.isLoading = false;
                });
            },
            /**
             * @function closeModal
             * @description This method closes the edit profile popup.
             */
            closeModal: function() {
                $scope.$emit('close:modal');
            }
        }).init();
    }
];