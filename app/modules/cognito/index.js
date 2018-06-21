'use strict';
// Home View
module.exports = angular.module('modules.cognito', [])
    .service('cognitoService', require('./services/cognitoService'));