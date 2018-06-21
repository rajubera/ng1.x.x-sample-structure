'use strict';
/**
 * A module that filters the devices based on disconnected status of the device
 * @module DeviceFilter
 */
module.exports = [
    function() {
        return function(items, states, isHide) {
            if (!isHide) {
                return items;
            } else {
                return items.filter(function(item) {
                    return states[item.DeviceId].ColorCode !== '0,0,255';
                });
            }
        };
    }
];