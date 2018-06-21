'use strict';
/**
 * A module that maintains the function in the contact info popup that opens on clicking on the device
 * It holds the method to edit contact details
 * @module ContactInfoController
 */

module.exports = ['$scope', '$uibModalInstance', '$filter', 'CONSTANTS', 'device', 'updateElderDetails',
    function($scope, $uibModalInstance, $filter, CONSTANTS, device, updateElderDetails) {
        var me = this;
        angular.extend(me, {
            init: function() {
                me.initScope();
            },
            /**
             * @function initScope
             * @description This method creates the dynamodb reference & add the reference of the selected device in the controller.
             */
            initScope: function() {
                me.device = device;
                me.updateElderDetailsData = updateElderDetails;
                me.ddb = new AWS.DynamoDB.DocumentClient({
                    region: CONSTANTS.cognito.region,
                    dynamoDbCrc32: false
                });
            },
            /**
             * @function editElderDetails
             * @description This method enabled the edit state.
             */
            editElderDetails: function() {
                this.isEdit = true;
                this.editedDevice = angular.copy(this.device);
            },
            /**
             * @function addRelative
             * @description This method adds more relative to the contact list.
             */
            addRelative: function($event) {
                $event.preventDefault();
                if (!me.editedDevice.elder.SeniorData.Relatives || !me.editedDevice.elder.SeniorData.Relatives.length) {
                    me.editedDevice.elder.SeniorData.Relatives = [];
                }
                me.editedDevice.elder.SeniorData.Relatives.push({});
            },
            /**
             * @function removeRelative
             * @description This method removes relative to the contact list.
             */
            removeRelative: function(index) {
                me.editedDevice.elder.SeniorData.Relatives.splice(index, 1);
            },
            /**
             * @function saveDetails
             * @description This method saves the edited data to dynamodb
             */
            saveDetails: function(editDetailsForm) {
                editDetailsForm.$setSubmitted();
                console.log('ng -submit =', editDetailsForm);
                if (!editDetailsForm.$valid) {
                    return;
                }
                var saveData = angular.copy(me.editedDevice.elder);
                for (var key in saveData.SeniorData) {
                    if (key !== 'Relatives') {
                        if (!saveData.SeniorData[key]) {
                            saveData.SeniorData[key] = 'null';
                        }
                    }
                }
                if (saveData.SeniorData.Relatives && saveData.SeniorData.Relatives.length) {
                    angular.forEach(saveData.SeniorData.Relatives, function(relative) {
                        delete relative.$$hashKey;
                        for (var relativeKey in relative) {
                            if (!relative[relativeKey]) {
                                relative[relativeKey] = 'null';
                            }
                        }
                    });
                }
                me.isSaving = true;
                delete me.errorMsg;
                var params = {
                    TableName: 'caregiverapp_seniors',
                    Key: {
                        SeniorId: saveData.SeniorId
                    },
                    UpdateExpression: 'set SeniorData = :SeniorData',
                    ExpressionAttributeValues: {
                        ':SeniorData': saveData.SeniorData
                    }
                };

                me.ddb.update(params, function(err) {
                    if (err) {
                        me.errorMsg = $filter('translate')('defaultError');
                        delete me.isSaving;
                    } else {
                        me.editedDevice.elder = saveData;
                        me.device = angular.copy(me.editedDevice);
                        delete me.editedDevice;
                        delete me.isEdit;
                        delete me.isSaving;
                        me.updateElderDetailsData(me.device);
                    }
                });
            },
            /**
             * @function cancelEdit
             * @description This method disables edit state.
             */
            cancelEdit: function() {
                delete this.isEdit;
                delete this.editedDevice;
            },
            /**
             * @function closeModal
             * @description This method closes the contact popup.
             */
            closeModal: function() {
                $uibModalInstance.close();
            }
        }).init();
    }
];
