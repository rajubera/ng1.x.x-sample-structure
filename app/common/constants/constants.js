'use strict';

/**
 * Constant module.
 * @module Constant
 */

/** This module contains the AWS Cognito configs */
var CONSTANTS = (function() {
    return {
        cognito: {
            region: 'xxxxx',
            UserPoolId: 'xxxxx',
            ClientId: 'xxxxx',
            IdentityPoolId: 'xxxxx'
        },
        apiUrl: 'https://qzg6sgzd5k.execute-api.eu-central-1.amazonaws.com/'
    };
}());

CONSTANTS.$inject = [];
module.exports = CONSTANTS;