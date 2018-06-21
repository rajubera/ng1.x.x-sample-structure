'use strict';
// Home View
module.exports = angular.module('modules.login', [])
  .controller('LoginCtrl', require('./controllers/LoginController'))
  .config(require('./loginRoutes'));
