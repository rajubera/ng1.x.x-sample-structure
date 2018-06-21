'use strict';

module.exports = angular.module('modules', [
  require('./cognito').name,
  require('./user').name,
  require('./home').name,
  require('./aws').name
]);
