'use strict';

module.exports = [
    function() {
        return {
            restrict: 'A',
            template: require('../templates/info-window.html'),
            link: function() {},
            controller: function($scope) {
                $scope.closeModal = function() {
                    $scope.$emit('close:modal');
                };
            }
        };
    }
];