'use strict';
/**
 * A module that loads the list of devices for the user to show in the dashboard and caches the data
 * @module DeviceService
 */
module.exports = [
    '$q',
    'CONSTANTS',
    '$filter',
    function($q, CONSTANTS, $filter) {
        this.deviceData = null;
        /**
         * @function authenticateDDB
         * @description This method creates the reference of the dynamodb
         */
        this.authenticateDDB = function() {
            this.ddb = new AWS.DynamoDB.DocumentClient({
                region: CONSTANTS.cognito.region,
                dynamoDbCrc32: false
            });
        };
        /**
         * @function resetData
         * @description This method resets the cached data
         */
        this.resetData = function() {
            this.deviceData = null;
        };
        /**
         * @function setSelectedDashboard
         * @description This method returns the selected dashboard name.
         */
        this.setSelectedDashboard = function(dashboardData) {
            this.deviceData.selectedDashboard = dashboardData;
        };
        /**
         * @function loadDeviceList
         * @description This method loads the list of devices for the user from dynamodb
         */

        this.loadDeviceList = function(username) {
            var deviceIds;
            var deffered = $q.defer();
            var me = this;
            if (me.deviceData) {
                deffered.resolve(me.deviceData);
            } else {
                me._loadUserDashboard(username).then(function(userDashboards) {
                        me.deviceData = {};
                        // console.log("First userDashboards:" + userDashboards[0]);
                        console.log('userDashboards:' + JSON.stringify(userDashboards));
                        if (!userDashboards || !userDashboards.length) {
                            me.deviceData.msg = $filter('translate')('noUserError');
                            deffered.resolve(me.deviceData);
                        } else {

                            var dashboardKeys = Object.keys(userDashboards[0].DashboardIds);
                            /*
                            console.log("Dashboard values:");
                            for (var dashboardKeys in userDashboards[0].DashboardIds) {
                                console.log(dashboardKeys + " -> " + userDashboards[0].DashboardIds[dashboardKeys]);
                              }
                            console.log("key 0 of dashboards: " + dashboardKeys[0]);
                            */
                            me._loadDashboards(dashboardKeys[0]).then(function(dashboard) {
                              // console.log("dashboard: " + dashboard);
                              // console.log("dashboard.length: " + dashboard.length);

                              // Introduce this control in the next if():
                              // console.log("dashboard[0].ContractIds.length: " + dashboard[0].ContractIds.length);
                              if (!dashboard || !dashboard.length) {
                                  me.deviceData.msg = $filter('translate')('noDashboardError');
                                  deffered.resolve(me.deviceData);
                              } else {

                                  me.deviceData.selectedDashboard = dashboard[0];
                                  // Load contract has to use batchGet
                                  // Here I need to make a loop to read contracts of this dashboard if the user owns it
                                  // Here in the future, reading the dashboard data, give permisions to this user depending if he is "viewer", "relative", etc

                                  me._loadContract(dashboard[0].ContractIds).then(function(contracts) {
                                      // console.log("CONTRACTS: " + JSON.stringify(contracts, null, '\t'));
                                      if (!contracts || !contracts.length) {
                                          me.deviceData.msg = $filter('translate')('noContractError');
                                          deffered.resolve(me.deviceData);
                                      } else {

                                          // Here check contract status and then dispaly:
                                          // Here add loop to check one by one contract list of dashboard:

                                          deviceIds = [];
                                          // elders = []; ?????????
                                          me.deviceData.devices = me.deviceData.devices || []; // To initializate the array
                                          contracts.forEach(function(contract) {

                                              if (contract.status && contract.status === 'active') {
                                                  // deviceIds = contracts[0].DeviceIds;
                                                  // console.log("contract: " + contract);
                                                  // console.log("username: " + username);
                                                  // console.log("contract.UserIds: " + Object.keys(contract.UserIds));

                                                  if (username in contract.UserIds) {
                                                      // console.log("Eh! this user is in the contract");

                                                      // Here read Elder of this contract:

                                                      me._loadElderly(contract.SeniorId).then(function(elder) {
                                                          if (!elder || !elder.length) {
                                                              me.deviceData.msg = $filter('translate')('noEldersError');
                                                              deffered.resolve(me.deviceData);
                                                          } else {

                                                              // Here load devices of the contract


                                                              // console.log("Those are the devices from the contract: ");
                                                              // console.log("contract.DeviceIds.length: " + Object.keys(contract.DeviceIds).length);
                                                              // console.log("contract.DeviceIds: " + Object.keys(contract.DeviceIds));
                                                              me._loadDeviceData(contract.DeviceIds).then(function(devices) {
                                                                  if (!devices || !devices.length) {
                                                                      me.deviceData.msg = $filter('translate')('noDeviceText');
                                                                      deffered.resolve(me.deviceData);
                                                                  } else {

                                                                      if (elder) {
                                                                          // console.log(JSON.stringify(devices));
                                                                          // me.deviceData.devices.push(devices);
                                                                          // console.log("device added to main variable: " + JSON.stringify(me.deviceData));

                                                                          // console.log("Devices in this contract: " + devices);
                                                                          devices.forEach(function(device) {
                                                                              // console.log(device);
                                                                              device.elder = device.elder || [];
                                                                              device.elder = elder[0];
                                                                              me.deviceData.devices.push(device);
                                                                          });
                                                                      }
                                                                      deffered.resolve(me.deviceData);
                                                                  }
                                                              }, function(error) {
                                                                  console.log('load device error', error);
                                                                  me.deviceData.msg = $filter('translate')('failedDeviceError');
                                                                  deffered.reject(new Error('load device error'));
                                                              });

                                                          }

                                                      }, function(error) {
                                                          console.log('load elders error', error);
                                                          me.deviceData.msg = $filter('translate')('failedEldersError');
                                                          deffered.reject(new Error('load elders error'));
                                                      });



                                                      // }
                                                      /*
                                            else {
                                                // Error because the user is not in the contract
                                                me.deviceData.msg = $filter('translate')('invalidContractError');
                                                deffered.resolve(me.deviceData);
                                            }*/
                                                  }
                                              } else {
                                                  // Error because contract is not active
                                                  me.deviceData.msg = $filter('translate')('invalidContractError');
                                                  deffered.resolve(me.deviceData);
                                              }
                                          });
                                          // console.log("me.deviceData: " + JSON.stringify(me.deviceData, null, '\t'));
                                      }
                                  }, function(error) {
                                      console.log('load contract error', error);
                                      me.deviceData.msg = $filter('translate')('failedContractError');
                                      deffered.reject(new Error('load contact error'));
                                  });


                              }
                          }, function(error) {
                              console.log('load dashbaord error', error);
                              me.deviceData.msg = $filter('translate')('failedDashboardError');
                              deffered.reject(new Error('load dashbaord error'));
                          });




                        }
                    },
                    function(error) {
                        console.log('load user error', error);
                        me.deviceData = {};
                        me.deviceData.msg = $filter('translate')('failedUserError');
                        deffered.reject(new Error('load user error'));
                    });
            }
            return deffered.promise;
        };
        /**
         * @function _loadUserDashboard
         * @description This method loads the list of dashboards for the user from caregiverapp_users table
         * @param {String} username Required param, the username
         */
        this._loadUserDashboard = function(username) {
            var deffered = $q.defer();
            var readparams = {
                TableName: 'caregiverapp_users',
                KeyConditionExpression: '#user = :user',
                ExpressionAttributeNames: {
                    '#user': 'UserId'
                },
                ExpressionAttributeValues: {
                    ':user': username
                }
            };
            this.ddb.query(readparams, function(err, data) {
                if (err) { deffered.reject(err); } else {
                    deffered.resolve(data.Items);
                }
            });
            return deffered.promise;
        };
        /**
         * @function _loadContract
         * @description This method loads the contract details from the caregiverapp_contracts table
         * @param {String} contractId Required param, the contractId
         */
        this._loadContract = function(contractIds) {
            var deffered = $q.defer();
            var requestKeys = [];
            var tableName = 'caregiverapp_contracts';
            // var keys = Object.keys(contractIds);
            // var values = Object.values(contractIds);

            for (var key in contractIds) {
                // console.log(key + " -> " + contractIds[key]);
                requestKeys.push({
                    ContractId: key,
                });
            }
            var params = {
                RequestItems: {}
            };
            params.RequestItems[tableName] = {
                Keys: requestKeys
            };
            this.ddb.batchGet(params, function(err, data) {
                if (err) { deffered.reject(err); } else {
                    deffered.resolve(data.Responses[tableName]);
                }
            });
            return deffered.promise;
        };
        /**
         * @function _loadDashboards
         * @description This method loads the dashboard details from the caregiverapp_dashboards table
         * @param {String} dashboardId Required param, the dashboardId
         */
        this._loadDashboards = function(dashboardId) {
            var deffered = $q.defer();
            console.log('dashboardId: ' + dashboardId);
            var readparams = {
                TableName: 'caregiverapp_dashboards',
                KeyConditionExpression: '#dash = :dash',
                ExpressionAttributeNames: {
                    '#dash': 'DashboardId'
                },
                ExpressionAttributeValues: {
                    ':dash': dashboardId
                }
            };
            this.ddb.query(readparams, function(err, data) {
                if (err) { deffered.reject(err); } else {
                    deffered.resolve(data.Items);
                }
            });
            return deffered.promise;
        };
        /**
         * @function _loadElderly
         * @description This method loads the list of elders for the dashboard from caregiverapp_caretakers table
         * @param {Array} elderIds Required param, the array of ids for the dashbaord
         * @param {String} contractId Required param, the contractId
         */
        this._loadElderly = function(SeniorId) {
            var deffered = $q.defer();
            var readparams = {
                TableName: 'caregiverapp_seniors',
                KeyConditionExpression: '#senior = :senior',
                ExpressionAttributeNames: {
                    '#senior': 'SeniorId'
                },
                ExpressionAttributeValues: {
                    ':senior': SeniorId
                }
            };
            this.ddb.query(readparams, function(err, data) {
                if (err) { deffered.reject(err); } else {
                    deffered.resolve(data.Items);
                }
            });
            return deffered.promise;
        };
        /**
         * @function _loadDeviceData
         * @description This method loads the list of devcies for the dashboard from caregiverapp_devices table
         * @param {Array} deviceIds Required param, the array of ids for the devices
         */
        this._loadDeviceData = function(deviceIds) {
            // console.log("Those are the devices that are being requested to DDB: ");
            // console.log("deviceIds: ");
            // console.log(deviceIds);
            var deffered = $q.defer();
            var requestKeys = [];
            var tableName = 'caregiverapp_devices';
            // var keys = Object.keys(deviceIds);
            // var values = Object.values(deviceIds);
            for (var key in deviceIds) {
                // console.log(key + " -> " + deviceIds[key]);
                requestKeys.push({
                    DeviceId: key,
                    Status: 'Activated'
                });
            }
            var params = {
                RequestItems: {}
            };
            params.RequestItems[tableName] = {
                Keys: requestKeys
            };
            this.ddb.batchGet(params, function(err, data) {
                if (err) { deffered.reject(err); } else {
                    deffered.resolve(data.Responses[tableName]);
                }
            });
            return deffered.promise;
        };
    }
];
