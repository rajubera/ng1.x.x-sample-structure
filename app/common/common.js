window.jQuery = window.$ = require('jquery');

require('angular-bootstrap');
require('angular-ui-router');
require('angular-animate');
require('angular-sanitize');
require('angular-cookies');
require('angular-translate');
require('SoundManager2');
require('awsCognitoSdk');
require('amazonCognitoIdentity');
require('aws-sdk');
require('angular-ui-switch');

window.AwsIot = require('aws-iot-device-sdk');
module.exports = angular.module('common', [
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'pascalprecht.translate',
    'uiSwitch',
    require('./factories').name,
    require('./directives').name,
    require('./configs').name,
    require('./constants').name,
    require('./controllers').name
]);