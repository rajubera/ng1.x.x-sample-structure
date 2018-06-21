'use strict';
/**
 * A module that calls congnito servcies
 * @module UserService
 */
module.exports = [
    '$q',
    '$cookies',
    '$state',
    '$window',
    'cognitoService',
    function($q, $cookies, $state, $window, cognitoService) {
        var userData = null;
        angular.extend(this, {
            /**
             * @function doUserSignup
             * @description This method calls cognito service signup users
             */
            doUserSignup: function(fields) {
                var deffered = $q.defer();
                cognitoService.doSignup(fields).then(function(response) {
                    deffered.resolve(response);
                }, function(error) {
                    deffered.reject(error);
                });
                return deffered.promise;
            },
            /**
             * @function doUserSignup
             * @description This method calls cognito service to activate the account
             */
            doUserActivate: function(fields) {
                var deffered = $q.defer();
                cognitoService.doActivate(fields).then(function(response) {
                    deffered.resolve(response);
                }, function(error) {
                    deffered.reject(error);
                });
                return deffered.promise;
            },
            /**
             * @function doUserLogin
             * @description This method calls cognito service to login
             */
            doUserLogin: function(fields) {
                var deffered = $q.defer();
                cognitoService.doLogin(fields).then(function(response) {
                    userData = response;
                    var expireDate = new Date();
                    expireDate.setFullYear(expireDate.getFullYear() + 1);
                    $cookies.put('user_data', JSON.stringify(fields), { expires: expireDate });
                    deffered.resolve(response);
                }, function(error) {
                    deffered.reject(error);
                });
                return deffered.promise;
            },
            /**
             * @function changePassword
             * @description This method calls cognito service to change the user's password
             */
            changePassword: function(fields) {
                var deffered = $q.defer();
                cognitoService.changePassword(userData.cognitoUser, fields).then(function(response) {
                    deffered.resolve(response);
                }, function(error) {
                    deffered.reject(error);
                });
                return deffered.promise;
            },
            /**
             * @function saveProfile
             * @description This method calls cognito service to save user's profile
             */
            saveProfile: function(fields) {
                var deffered = $q.defer();
                cognitoService.saveProfile(userData.cognitoUser, fields).then(function(response) {
                    userData.userDetails = response;
                    deffered.resolve(response);
                }, function(error) {
                    deffered.reject(error);
                });
                return deffered.promise;
            },
            /**
             * @function forgetPassword
             * @description This method calls cognito service to send verification token on forget password
             */
            forgetPassword: function(fields) {
                var deffered = $q.defer();
                cognitoService.forgetPassword(fields).then(function(response) {
                    deffered.resolve(response);
                }, function(error) {
                    deffered.reject(error);
                });
                return deffered.promise;
            },
            /**
             * @function resetPassword
             * @description This method calls cognito service to reset user's password
             */
            resetPassword: function(fields) {
                var deffered = $q.defer();
                cognitoService.resetPassword(fields).then(function(response) {
                    deffered.resolve(response);
                }, function(error) {
                    deffered.reject(error);
                });
                return deffered.promise;
            },
            /**
             * @function getUserData
             * @description This method calls cognito service to get logged in user's details
             */
            getUserData: function() {
                var me = this;
                var deffered = $q.defer();
                if (userData) {
                    deffered.resolve(userData);
                } else {
                    var fields = $cookies.get('user_data');
                    if (fields) {
                        cognitoService.doLogin(JSON.parse(fields)).then(function(response) {
                            userData = response;
                            deffered.resolve(response);
                        }, function(error) {
                            me.doLogout();
                            deffered.reject(error);
                        });
                    } else {
                        deffered.reject();
                    }
                }
                return deffered.promise;
            },
            /**
             * @function doLogout
             * @description This method calls cognito service to logout
             */
            doLogout: function() {
                if (userData && userData.cognitoUser) {
                    cognitoService.doLogout(userData.cognitoUser);
                }
                $window.localStorage.clear();
                var cookies = $cookies.getAll();
                angular.forEach(cookies, function(v, k) {
                    $cookies.remove(k);
                });
                userData = null;
                $state.go('login');
            },
            /**
             * @function isLoggedIn
             * @description This method checkes whether the user is logged in or not and returns boolean value
             */
            isLoggedIn: function() {
                if (userData) {
                    return true;
                } else {
                    if ($cookies.get('user_data')) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });
    }
];