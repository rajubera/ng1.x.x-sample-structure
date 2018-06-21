'use strict';
// Home View
module.exports = angular.module('modules.signup', [])
  .controller('SignupCtrl', require('./controllers/SignupController'))
  .config(require('./signupRoutes'));
