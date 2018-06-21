'use strict';
/**
 * A module that handles the awt cognito related codes
 * @module AWSCognito
 */
module.exports = [
    '$q',
    'CONSTANTS',
    '$filter',
    function($q, CONSTANTS, $filter) {
        // Cognito User Pool Id
        AWSCognito.config.region = CONSTANTS.cognito.region;
        AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: CONSTANTS.cognito.IdentityPoolId
        });
        AWSCognito.config.update({ accessKeyId: 'anything', secretAccessKey: 'anything' });
        angular.extend(this, {
            /**
             * @function doSignup
             * @description a method that calls cognito service to signup
             * @param {Object} fields Required param {name:'ABC',email:'abc@abc.com'}
             */
            doSignup: function(fields) {
                var deffered = $q.defer();
                var userPool = this.getUserPool();

                var nameParam = {
                    Name: 'name',
                    Value: fields.name
                };

                var emailParam = {
                    Name: 'email',
                    Value: fields.email
                };

                var attributes = this.getUserAttributes(nameParam, emailParam);

                userPool.signUp(fields.email, fields.password, attributes, null, function(err, result) {
                    if (err) {
                        console.log(err);
                        deffered.reject(err);
                    } else {
                        deffered.resolve(result);
                    }
                });
                return deffered.promise;
            },
            /**
             * @function doActivate
             * @description a method that calls cognito service to activate the account based on token verification
             * @param {Object} fields Required param {code:'123456',email:'abc@abc.com'}
             */
            doActivate: function(fields) {
                var deffered = $q.defer();
                var userPool = this.getUserPool();

                var cognitoUser = this.getUser(userPool, fields.email);
                var activationKey = fields.code;

                cognitoUser.confirmRegistration(activationKey, true, function(err, result) {
                    if (err) {
                        deffered.reject(err);
                    } else {
                        deffered.resolve(result);
                    }
                });
                return deffered.promise;
            },
            /**
             * @function forgetPassword
             * @description a method that calls cognito service send email for forget password verification token
             * @param {Object} fields Required param {email:'abc@abc.com'}
             */
            forgetPassword: function(fields) {
                var deffered = $q.defer();
                var userPool = this.getUserPool();

                var cognitoUser = this.getUser(userPool, fields.email);

                cognitoUser.forgotPassword({
                    onSuccess: function(data) {
                        // successfully initiated reset password request
                        deffered.resolve(data);
                    },
                    onFailure: function(err) {
                        deffered.reject(err);
                    }
                });
                return deffered.promise;
            },
            /**
             * @function changePassword
             * @description a method that calls cognito service to change password
             * @param {Object} fields Required param {oldPassword:'ABC',password:'XYZ'}
             */
            changePassword: function(cognitoUser, fields) {
                var deffered = $q.defer();
                cognitoUser.changePassword(fields.oldPassword, fields.password, function(err, result) {
                    if (err) {
                        deffered.reject(err);
                    } else {
                        deffered.resolve(result);
                    }
                });
                return deffered.promise;
            },
            /**
             * @function saveProfile
             * @description a method that calls cognito service to user profile's data
             * @param {Object} fields Required param {email:'abc@abc.com',birthdate:'20/04/1990',address:'',gender:'male'}
             */
            saveProfile: function(cognitoUser, fields) {
                var deffered = $q.defer();
                var attributeList = [];

                for (var key in fields) {
                    if (key !== 'email' && key !== 'email_verified' && key !== 'sub' && key !== 'phone_number_verified') {
                        var value = fields[key];
                        if (key === 'birthdate') {
                            value = $filter('date')(fields[key], 'yyyy/MM/dd');
                        }
                        attributeList.push({
                            Name: key,
                            Value: value
                        });
                    }
                }
                cognitoUser.updateAttributes(attributeList, function(err) {
                    if (err) {
                        deffered.reject(err);
                    } else {
                        deffered.resolve(fields);
                    }
                });
                return deffered.promise;
            },
            /**
             * @function resetPassword
             * @description a method that calls cognito service to reset password
             * @param {Object} fields Required param {email:'abc@abc.com',code:'123',password:'XYZ'}
             */
            resetPassword: function(fields) {
                var deffered = $q.defer();
                var userPool = this.getUserPool();

                var cognitoUser = this.getUser(userPool, fields.email);

                cognitoUser.confirmPassword(fields.code, fields.password, {
                    onSuccess(result) {
                        deffered.resolve(result);
                    },
                    onFailure(err) {
                        deffered.reject(err);
                    }
                });
                return deffered.promise;
            },
            /**
             * @function doLogin
             * @description a method that calls cognito service to login
             * @param {Object} fields Required param {email:'abc@abc.com',password:'XYZ'}
             */
            doLogin: function(fields) {
                var deffered = $q.defer();
                var authenticationDetails = this.getAuthenticationDetails(fields.email, fields.password);
                var userPool = this.getUserPool();
                var cognitoUser = this.getUser(userPool, fields.email);
                var me = this;
                var login = {};
                var accessToken,
                    loginKey;
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function(result) {
                        accessToken = result.getAccessToken().getJwtToken();
                        loginKey = 'cognito-idp.' + CONSTANTS.cognito.region + '.amazonaws.com/' + CONSTANTS.cognito.UserPoolId;
                        login[loginKey] = result.getIdToken().getJwtToken();
                        AWS.config.update({
                            credentials: new AWS.CognitoIdentityCredentials({
                                IdentityPoolId: CONSTANTS.cognito.IdentityPoolId,
                                Logins: login
                            }),
                            region: CONSTANTS.cognito.region
                        });
                        AWS.config.credentials.refresh((error) => {
                            if (error) {
                                console.error(error);
                            } else {
                                console.log('Successfully logged!');
                            }
                        });
                        me.getUserDetails(cognitoUser).then(function(userAttributes) {
                            var currentUser = {
                                cognitoUser: cognitoUser,
                                accessToken: accessToken,
                                userDetails: userAttributes
                            };
                            deffered.resolve(currentUser);
                        }, function(error) {
                            deffered.reject(error);
                        });
                    },
                    onFailure: function(err) {
                        deffered.reject(err);
                    }
                });
                return deffered.promise;
            },
            /**
             * @function getUserDetails
             * @description a method that calls cognito service to user deatils of cognito user
             * @param {Object} cognitoUser Required param, a reference of congnito user
             */
            getUserDetails: function(cognitoUser) {
                var deffered = $q.defer();
                cognitoUser.getUserAttributes(function(err, result) {
                    if (err) {
                        deffered.reject(err);
                    } else {
                        var data = {};
                        for (var i = 0; i < result.length; i++) {
                            data[result[i].getName()] = result[i].getValue();
                        }
                        deffered.resolve(data);
                    }
                });
                return deffered.promise;
            },
            /**
             * @function doLogout
             * @description a method that calls cognito service to logout the user
             */
            doLogout: function(cognitoUser) {
                cognitoUser.signOut();
            },
            /**
             * @function getUserPool
             * @description a method that calls cognito service that returns a user pool
             */
            getUserPool: function() {
                var poolData = {
                    UserPoolId: CONSTANTS.cognito.UserPoolId,
                    ClientId: CONSTANTS.cognito.ClientId
                };
                var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
                return userPool;
            },
            /**
             * @function getUser
             * @description a method that calls cognito service that returns a cognito user reference.
             * @param {Object} userPool Required param, a reference of congnito pool
             * @param {Object} username Required param, user's email
             */
            getUser: function(userPool, username) {
                var userData = {
                    Username: username,
                    Pool: userPool
                };
                var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
                return cognitoUser;
            },
            /**
             * @function getAuthenticationDetails
             * @description a method that calls cognito service that returns the authenticated user
             * @param {string} username Required param, user's email
             * @param {string} password Required param, user's password
             */
            getAuthenticationDetails: function(username, password) {
                var authenticationData = {
                    Username: username,
                    Password: password
                };
                var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
                return authenticationDetails;
            },
            /**
             * @function getUserAttributes
             * @description a method that returns the list of cognito attributes from the passed parameters.
             */
            getUserAttributes: function() {
                var attributes = [];
                for (var i = 0; i < arguments.length; i++) {
                    var attr = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(arguments[i]);
                    attributes.push(attr);
                }
                return attributes;
            }
        });
    }
];