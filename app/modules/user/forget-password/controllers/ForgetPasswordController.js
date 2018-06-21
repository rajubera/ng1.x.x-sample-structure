'use strict';
/**
 * A module that sends verification token to user on forgerpassword
 * @module ForgetPasswordController
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
             * @function submitUsername
             * @description This method calls cognito service to send verification token for foregt password
             */
            submitUsername: function(forgetPasswordForm, fields) {
                forgetPasswordForm.$setSubmitted();
                console.log('ng -submit =', forgetPasswordForm, fields);
                if (!forgetPasswordForm.$valid) {
                    return;
                }
                me.isLoading = true;
                delete me.errorMsg;
                userService.forgetPassword(me.fields).then(function() {
                    me.isLoading = false;
                    $state.go('reset-password', {
                        email: me.fields.email
                    });
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
            goToResetPassword: function() {
                $state.go('reset-password', {
                    email: me.fields.email
                });
            }
        }).init();
    }
];