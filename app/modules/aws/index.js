'use strict';
// Home View
module.exports = angular.module('modules.aws', [])
    .factory('MqttClientAws', require('./MqttClientAws'));