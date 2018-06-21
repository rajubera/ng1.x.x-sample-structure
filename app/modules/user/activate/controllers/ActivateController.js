'use strict';
/**
 * A module that activates user's account after signup by verifying the activation token received via mail
 * @module ActivateController
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
             * @function doActivate
             * @description This method calls cognito service to activate the user's account
             */
            doActivate: function(activateForm, fields) {
                activateForm.$setSubmitted();
                console.log('ng -submit =', activateForm, fields);
                if (!activateForm.$valid) {
                    return;
                }
                me.isLoading = true;
                delete me.errorMsg;
                userService.doUserActivate(me.fields).then(function() {
                    me.isLoading = false;
                    $state.go('login');
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
            goToForgetPassword: function() {
                $state.go('forget-password', {
                    email: me.fields.email
                });
            }
        }).init();
    }
];