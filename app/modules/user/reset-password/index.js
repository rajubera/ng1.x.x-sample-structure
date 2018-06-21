'use strict';
// Home View
module.exports = angular.module('modules.reset', [])
  .controller('ResetPasswordCtrl', require('./controllers/ResetPasswordController'))
  .config(require('./resetPasswordRoutes'));
