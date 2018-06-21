'use strict';
/**
 * A module that is used to signup user
 * @module SignupController
 */

module.exports = ['$scope', '$state', 'userService',
    function($scope, $state, userService) {
        var me = this;
        angular.extend(me, {
            init: function() {
                me.initScope();
            },
            initScope: function() {
                me.fields = {};
            },
            /**
             * @function doSignup
             * @description This method calls cognito service to signup user
             */
            doSignup: function(signupForm, fields) {
                signupForm.$setSubmitted();
                console.log('ng -submit =', signupForm, fields);
                if (!signupForm.$valid) {
                    return;
                }
                me.isLoading = true;
                delete me.errorMsg;
                userService.doUserSignup(me.fields).then(function() {
                    me.isLoading = false;
                    $state.go('activate', {
                        email: me.fields.email
                    });
                }, function(error) {
                    if (error && error.message) {
                        me.errorMsg = error.message;
                    } else {
                        me.errorMsg = 'Something went wrong! Please try again';
                    }
                    me.isLoading = false;
                });
            }
        }).init();
    }
];