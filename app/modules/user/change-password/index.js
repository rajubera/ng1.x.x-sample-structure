'use strict';
// Home View
module.exports = angular.module('modules.change', [])
  .controller('ChangePasswordCtrl', require('./controllers/ChangePasswordController'))
  .directive('changePassword', require('./directives/changePassword.js'));
