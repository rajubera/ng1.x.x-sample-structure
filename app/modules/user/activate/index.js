'use strict';
// Home View
module.exports = angular.module('modules.activate', [])
  .controller('ActivateCtrl', require('./controllers/ActivateController'))
  .config(require('./activateRoutes'));
