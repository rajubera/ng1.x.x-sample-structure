'use strict';

module.exports = angular.module('common.directives', [])
    .directive('headerBar', require('./headerbar.js'))
    .directive('compareTo', require('./compareto-validation.js'));