'use strict';
// Home View
module.exports = angular.module('modules.home', [])
  .controller('HomeCtrl', require('./controllers/HomeController'))
  .controller('ContactInfoCtrl', require('./controllers/ContactInfoController'))
  .directive('infoWindow', require('./directives/InfoWindow'))
  .service('deviceList', require('./services/DeviceService'))
  .filter('deviceFilter', require('./filters/DeviceFilter'))
  .factory('deviceStates', require('./factories/deviceStates.js'))
  .config(require('./homeRoutes'));
