'use strict';

var angular = require('angular');

module.exports = angular.module('careGiverApp', [
        require('./common/common.js').name,
        require('./modules').name
    ])
    .config(require('./appConfig'))
    .controller('AppCtrl', require('./AppController'))
    .constant('version', require('../package.json').version)
    .run(require('./common/common-init.js'));