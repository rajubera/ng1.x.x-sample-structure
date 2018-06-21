'use strict';
/**
 * A module that used to login.
 * @module LoginController
 */

module.exports = ['$scope', '$http', '$state', '$filter', 'userService', 'CONSTANTS',
    function($scope, $http, $state, $filter, userService, CONSTANTS) {
        var me = this;
        angular.extend(me, {
            init: function() {
                me.initScope();
            },
            initScope: function() {
                me.fields = {};
            },
            /**
             * @function doLogin
             * @description This method calls cognito service to login
             */
            doLogin: function(loginForm, fields) {
                loginForm.$setSubmitted();
                console.log('ng -submit =', loginForm, fields);
                if (!loginForm.$valid) {
                    return;
                }
                me.isLoading = true;
                delete me.errorMsg;
                userService.doUserLogin(me.fields).then(function() {
                    userService.getUserData().then(function(data) {
                        if (data.userDetails && data.userDetails['custom:iotPolicyAttached'] && data.userDetails['custom:iotPolicyAttached'] === 'true') {
                            me.isLoading = false;
                            $state.go('home');
                        } else {
                            AWS.config.credentials.refresh(() => {
                                if (AWS.config.credentials) {
                                    var req = {
                                        method: 'POST',
                                        url: CONSTANTS.apiUrl + 'test/cognitoattachpolicy',
                                        data: {
                                            request: {
                                                userAttributes: {
                                                    name: data.userDetails.name,
                                                    email: me.fields.email,
                                                    identityId: AWS.config.credentials.identityId
                                                }
                                            }
                                        }
                                    };

                                    $http(req).then(function() {
                                        me.isLoading = false;
                                        $state.go('home');
                                    }, function() {
                                        userService.doLogout();
                                        me.errorMsg = $filter('translate')('failedPolicy');
                                        me.isLoading = false;
                                    });
                                } else {
                                    userService.doLogout();
                                    me.errorMsg = $filter('translate')('failedPolicy');
                                    me.isLoading = false;
                                }
                            });
                        }
                    }, function(error) {
                        console.log(error);
                        userService.doLogout();
                        if (error && error.message) {
                            me.errorMsg = error.message;
                        } else {
                            me.errorMsg = $filter('translate')('defaultError');
                        }
                        me.isLoading = false;
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
            goToForgetPassword: function() {
                $state.go('forget-password', {
                    email: me.fields.email
                });
            },
            goToActivateAccount: function() {
                $state.go('activate', {
                    email: me.fields.email
                });
            }
        }).init();
    }
];
