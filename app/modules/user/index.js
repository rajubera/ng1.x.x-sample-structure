'use strict';
// Home View
module.exports = angular.module('modules.user', [
	require('./forget-password').name,
	require('./reset-password').name,
	require('./change-password').name,
	require('./edit-profile').name,
    require('./activate').name,
    require('./signup').name,
    require('./login').name
  ])
  .service('userService', require('./services/userServices'));
