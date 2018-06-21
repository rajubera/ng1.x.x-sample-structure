'use strict';
/**
 * A module that changes user's account details
 * @module EditProfileController
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
                me.dateFormat = 'yyyy/MM/dd';
                me.isLoadingUser = true;
                me.dateOptions = {
                    maxDate: new Date()
                };
                me.isDateOpened = false;
                userService.getUserData().then(function(data) {
                    me.fields = angular.copy(data.userDetails);
                    if (me.fields.birthdate) {
                        me.fields.birthdate = new Date(me.fields.birthdate);
                    }
                    delete me.isLoadingUser;
                }, function() {
                    delete me.isLoadingUser;
                });
            },
            openDatePicker: function() {
                me.isDateOpened = true;
            },
            backToDashboard: function() {
                me.closeModal();
            },
            /**
             * @function saveProfile
             * @description This method calls cognito service to change the user's account details
             */
            saveProfile: function(editProfileForm, fields) {
                editProfileForm.$setSubmitted();
                console.log('ng -submit =', editProfileForm, fields);
                if (!editProfileForm.$valid) {
                    return;
                }
                me.isLoading = true;
                delete me.errorMsg;
                userService.saveProfile(me.fields).then(function() {
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