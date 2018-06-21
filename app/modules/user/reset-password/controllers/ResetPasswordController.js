'use strict';
/**
 * A module that reset's user's password
 * @module ResetPasswordController
 */

module.exports = ['$scope', '$state', '$filter', 'userService',
    function($scope, $state, $filter, userService) {
        var me = this;
        angular.extend(me, {
            init: function() {
                me.initScope();
            },
            initScope: function() {
                me.fields = {};
                if ($state.params && $state.params.email) {
                    me.fields.email = $state.params.email;
                }
            },
            /**
             * @function resetPassword
             * @description This method calls cognito service to reset user's password
             */
            resetPassword: function(resetPasswordForm, fields) {
                resetPasswordForm.$setSubmitted();
                console.log('ng -submit =', resetPasswordForm, fields);
                if (!resetPasswordForm.$valid) {
                    return;
                }
                me.isLoading = true;
                delete me.errorMsg;
                userService.resetPassword(me.fields).then(function() {
                    me.isLoading = false;
                    $state.go('login');
                }, function(error) {
                    if (error && error.message) {
                        me.errorMsg = error.message;
                    } else {
                        me.errorMsg = $filter('translate')('defaultError');
                    }
                    me.isLoading = false;
                });
            }
        }).init();
    }
];