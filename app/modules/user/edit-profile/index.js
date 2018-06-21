'use strict';
// Home View
module.exports = angular.module('modules.editProfile', [])
  .controller('EditProfileCtrl', require('./controllers/EditProfileController'))
  .directive('editProfile', require('./directives/editProfile.js'));
