'use strict';
/**
 * A module that stores the states of the devices. Once the user goes to other pages from dashboard
 * the last state of the devices will be stored here.
 * @module DeviceStates
 */
module.exports = [
    function() {
        var states = {
            data: {}
        };
        /**
         * @function getStates
         * @description This method returns the last saved state data.
         */
        states.getStates = function() {
            return states.data;
        };
        /**
         * @function resetStates
         * @description This method resets the state of the devices to empty.
         */
        states.resetStates = function() {
            states.data = {};
        };
        return states;
    }
];