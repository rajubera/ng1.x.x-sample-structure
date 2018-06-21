'use strict';
/**
 * A module that exports a directive that is used to validate the password & confirm password fields.
 * It checks if the values of both fields are same or not. If not same then it produces a validation error.
 * @module CompareToValidationDirective
 */
module.exports = [
    function() {
        return {
            require: 'ngModel',
            scope: {
                otherModelValue: '=compareTo'
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue === scope.otherModelValue;
                };

                scope.$watch('otherModelValue', function() {
                    ngModel.$validate();
                });
            }
        };
    }
];