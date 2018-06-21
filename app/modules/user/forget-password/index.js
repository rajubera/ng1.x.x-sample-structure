'use strict';
// Home View
module.exports = angular.module('modules.forget', [])
  .controller('ForgetPasswordCtrl', require('./controllers/ForgetPasswordController'))
  .config(require('./forgetPasswordRoutes'));
