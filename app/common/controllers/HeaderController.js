'use strict';
/**
 * A module that exports the header bar controller
 * @module HeaderbarController
 */
module.exports = ['$scope', '$rootScope', '$uibModal', '$state', 'userService', 'lang','deviceList',
    function($scope, $rootScope, $uibModal, $state, userService, lang, deviceList) {
        var me = this;
        angular.extend(me, {
            init: function() {
                me.initScope();
            },
            /**
             * This method loads the details for loggedin user
             * It also loads the avaiable language oprtions and sets the selected language
             */
            initScope: function() {
                userService.getUserData().then(function(data) {
                    me.userData = data.userDetails;
                });
                me.langOptions = lang.getLangOptions();
                me.selectedLang = lang.getLang();
            },
            /**
             * This method redirects the user to the home page if logged in.
             * And redirects the user to the login page if not logged in.
             * This method is called on clicking on the app logo.
             */
            goToHome: function() {
                if (userService.isLoggedIn()) {
                    $state.go('home');
                } else {
                    $state.go('login');
                }
            },
            /**
             * This method opens the popup to show the change password page
             */
            openChangePassword: function() {
                $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: '<div change-password></div>',
                    controller: 'ModalCtrl',
                    size: 'md',
                    windowClass: ''
                });
            },
            /**
             * This method This method opens the popup to show the edit profile page
             */
            openEditProfile: function() {
                $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: '<div edit-profile></div>',
                    controller: 'ModalCtrl',
                    size: 'md',
                    windowClass: ''
                });
            },
            /**
             * This method opens the popup to show the informantion of the app on clicking on the info button
             */
            openInfoWindow: function() {
                $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: '<div info-window></div>',
                    controller: 'ModalCtrl',
                    size: 'lg',
                    windowClass: ''
                });
            },
            /**
             * This method changes the selected language in the app
             */
            changeLanguage: function(langData) {
                lang.setLang(langData);
                me.langOptions = lang.getLangOptions();
                me.selectedLang = lang.getLang();
            },
            /**
             * This method is called on click on the logout option in the account.
             */
            doLogout: function() {
                deviceList.resetData();
                userService.doLogout();
            }
        }).init();
    }
];