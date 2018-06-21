'use strict';
/**
 * A module that maintains the function in dashboard page
 * @module HomeController
 */

module.exports = ['$scope', '$rootScope', '$timeout', '$interval', '$window', '$uibModal', 'userService', 'deviceList', 'deviceStates', 'MqttClientAws', 'CONSTANTS',
    function($scope, $rootScope, $timeout, $interval, $window, $uibModal, userService, deviceList, deviceStates, MqttClientAws, CONSTANTS) {
        var me = this;
        angular.extend(me, {
            init: function() {
                me.initScope();
                $scope.$on('$destroy', function onDismissed() {
                    me.onDestroy();
                });
                $window.addEventListener('beforeunload', function() {
                    me.onDestroy();
                });
                $rootScope.$on('lang:changed', function() {
                    me.updateBlockHeight();
                });
            },
            /**
             * @function onDestroy
             * @description This method removes all event listeners, destroys te sound and unsubscribes the aws iot device
             */
            onDestroy: function() {
                console.log('on destroy controller');
                deviceStates.resetStates();
                me.unregisterDevices();
                me.disconnecDevices();
                delete me.deviceList;
                delete me.initializedData;
                soundManager.destroySound('mySound');
                $interval.cancel(me.sleepInterval);
                $interval.cancel(me.connectionInterval);
                delete me.connectionInterval;
                delete me.sleepInterval;
                $window.removeEventListener('online', me.updateOnlineIndicator);
                $window.removeEventListener('offline', me.updateOnlineIndicator);
            },
            /**
             * @function initScope
             * @description This method creates the dynamodb reference, added interval to check for network conncetion
             */
            initScope: function() {
                me.isLoadingUser = true;
                me.isDisconnectedHidden = false;
                // Load logged in user's details
                userService.getUserData().then(function(data) {
                    deviceList.authenticateDDB();
                    me.ddb = new AWS.DynamoDB.DocumentClient({
                        region: CONSTANTS.cognito.region,
                        dynamoDbCrc32: false
                    });
                    me.userData = data;
                    delete me.isLoadingUser;
                    // Create dynamoDB instance
                    me.lastUpdateTime = new Date().getTime();
                    // Listens online status to show internet connectivty ge
                    $window.addEventListener('online', me.updateOnlineIndicator);
                    $window.addEventListener('offline', me.updateOnlineIndicator);
                    me.setUpPlayAudio();
                    // Checked for sleep mode of the browser tab in evety 2 second
                    me.checkForSleepMode();
                    me.sleepInterval = $interval(me.checkForSleepMode, 2000);
                    // Checks for internet connectivity in every 3 minutes
                    me.doesConnectionExist();
                    me.connectionInterval = $interval(me.doesConnectionExist, 30000);
                }, function() {
                    delete me.isLoadingUser;
                });
            },
            /**
             * @function setUpPlayAudio
             * @description This method setup play audio, for device status red
             */
            setUpPlayAudio: function() {
                soundManager.setup({
                    url: 'images/recorder.swf',
                    flashVersion: 9,
                    preferFlash: false, // prefer 100% HTML5 mode, where both supported
                    onready: function() {
                        me.createSound();
                    },
                    defaultOptions: {
                        volume: 100
                    }
                });
            },
            /**
             * @function createSound
             * @description This method creates the audio, for device status red
             */
            createSound: function() {
                soundManager.createSound({
                    id: 'mySound',
                    url: 'audios/AudioJoiner161123232429.wav',
                    onload: function() {

                    }
                });
            },
            /**
             * @function playSound
             * @description This method plays the audio, for device status red
             */
            playSound: function() {
                if (soundManager.ok() && !me.isPlaying) {
                    soundManager.play('mySound', {
                        onplay: function() {
                            me.isPlaying = true;
                        },
                        whileplaying: function() {

                        },
                        onfinish: function() {
                            delete me.isPlaying;
                        }
                    });
                }
            },
            /**
             * @function isStatusAvailable
             * @description This method checks for valid color code
             */
            isStatusAvailable: function(ColorCode) {
                if (ColorCode === '255,0,0' ||
                    ColorCode === '255,255,0' ||
                    ColorCode === '0,255,0' ||
                    ColorCode === '0,0,255' ||
                    ColorCode === '255,255,255') {
                    return true;
                } else {
                    return false;
                }
            },
            /**
             * @function getStatusButton
             * @description This method returns status image url based on color code
             */
            getStatusButton: function(ColorCode) {
                var statusUrl;
                if (ColorCode === '255,0,0') {
                    statusUrl = 'images/redbutton.png';
                } else if (ColorCode === '255,255,0') {
                    statusUrl = 'images/yellowbutton.png';
                } else if (ColorCode === '0,255,0') {
                    statusUrl = 'images/greenbutton.png';
                } else if (ColorCode === '0,0,255') {
                    statusUrl = 'images/bluebutton.png';
                } else {
                    statusUrl = 'images/whitebutton.png';
                }
                return statusUrl;
            },
            /**
             * @function updateOnlineIndicator
             * @description This method to check device online status
             */
            updateOnlineIndicator: function(event) {
                console.log('update indicator', navigator.onLine, me.isConnected);
                if (!navigator.onLine) {
                    me.online = false;
                } else {
                    if (me.isConnected) {
                        if (!me.initializedData) {
                            me.online = true;
                            me.deviceStates = deviceStates.getStates();
                            me.loadDeviceList();
                        } else {
                            $timeout(function() {
                                $window.location.reload();
                            }, 5000);
                        }
                    }
                }
                if (event) {
                    $scope.$apply();
                }
            },
            /**
             * @function checkForSleepMode
             * @description This method to check if the desktop/mobile is in sleep mode or some other browser is opened
             */
            checkForSleepMode: function() {
                var currentTime = new Date().getTime();
                if (currentTime > (me.lastUpdateTime + 5000)) { // ignore small delays
                    console.log('woke up');
                    me.updateOnlineIndicator();
                }
                me.lastUpdateTime = currentTime;
            },
            /**
             * @function doesConnectionExist
             * @description This method to check if there is network connection is avaiable in the desktop/mobile where the app is opened
             */
            doesConnectionExist: function() {
                var xhr, file, processRequest;
                xhr = new XMLHttpRequest();
                file = 'https://cdnjs.cloudflare.com/ajax/libs/favico.js/0.3.10/favico.min.js';
                processRequest = function(e) {
                    // console.log(xhr.readyState, xhr.status);
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 304) {
                            if (!me.isConnected) {
                                me.isConnected = true;
                                me.updateOnlineIndicator(e);
                            } else {
                                me.isConnected = true;
                            }
                        } else {
                            if (me.isConnected) {
                                me.isConnected = false;
                                me.updateOnlineIndicator(e);
                            } else {
                                me.isConnected = false;
                            }
                        }
                    }
                };

                xhr.open('HEAD', file, true);
                xhr.send();

                xhr.addEventListener('readystatechange', processRequest, false);
            },
            /**
             * @function loadDeviceList
             * @description This method loads the list of devices for the user from dynamodb
             */
            loadDeviceList: function() {
                if (me.userData.cognitoUser && me.userData.cognitoUser.username) {
                    delete me.initializedData;
                    me.isLoading = true;
                    deviceList.loadDeviceList(me.userData.cognitoUser.username).then(function(data) {
                        me.isLoading = false;
                        console.log('device data', data);
                        if (data.selectedDashboard) {
                            me.setDashboardName(data.selectedDashboard);
                        }
                        if (data.devices && data.devices.length) {
                            me.deviceList = data.devices;
                            me.deviceStates = deviceStates.getStates();
                            me.initMQTT();
                        }
                        me.deviceLoadMessage = data.msg;

                    }, function(error) {
                        console.log('load dashbaord error', error);
                        me.isLoading = false;
                    });
                }
            },
            /**
             * @function setDashboardName
             * @description This method sets the selected dashbaord name to show
             */
            setDashboardName: function(dashboardData) {
                me.selectedDashboard = dashboardData;
                if (!me.selectedDashboard.DashboardName || me.selectedDashboard.DashboardName === 'null') {
                    me.communityName = '';
                } else {
                    me.communityName = me.selectedDashboard.DashboardName;
                }
            },
            /**
             * @function saveCommunity
             * @description This method calls dynamodb to save the new name of the dashboard, this method is called on blur of the input
             */
            saveCommunity: function() {
                var currentName = me.selectedDashboard.DashboardName;
                var newName = (me.communityName && me.communityName !== '') ? me.communityName : 'null';
                console.log(newName, currentName);
                if (newName !== currentName) {
                    var params = {
                        TableName: 'caregiverapp_dashboards',
                        Key: {
                            DashboardId: me.selectedDashboard.DashboardId
                        },
                        UpdateExpression: 'set DashboardName = :dashboardName',
                        ExpressionAttributeValues: {
                            ':dashboardName': newName
                        }
                    };

                    me.ddb.update(params, function(err) {
                        if (err) {
                            me.communityName = currentName;
                        } else {
                            me.selectedDashboard.DashboardName = newName;
                            deviceList.setSelectedDashboard(me.selectedDashboard);
                        }
                    });
                }
            },
            /**
             * @function initMQTT
             * @description This method to create a aws iot device reference, for each device and it calls the MqttClientAws service to subscribe for update state.
             */
            initMQTT: function() {
                console.log('application init');
                me.logMessages += ' application init ' + '<br/><hr/>';
                me.isLoading = true;

                MqttClientAws.createClient().then(function() {
                    if (!me.initializedData && me.deviceList) {
                        me.onMessageArrivedAws();
                        me.onTimeoutAwsIot();
                        me.onCloseAWSIot();
                        me.onOfflineAWSIot();
                        me.onErrorAWSIot();

                        // register for all devices
                        for (var i = 0; i < me.deviceList.length; i++) {
                            var deviceId = me.deviceList[i].DeviceId;
                            me.deviceStates[deviceId] = {
                                getStatusCount: 0,
                                lastUpdated: new Date().getTime(),
                                deviceID: deviceId,
                                ColorCode: '255,255,255' // set to white at first because status is UNKNOWN
                            };

                            MqttClientAws.publishGetShadow(deviceId);
                        }
                        me.initializedData = true;
                        delete me.isLoading;
                        me.updateBlockHeight();
                        // After every minute, check if 15 minute timeout is reached for any device,
                        // if that's the case - set status to blue.
                        if (me.checkingInterval) {
                            $interval.cancel(me.checkingInterval);
                        }
                        me.checkDeviceStatus();
                        me.checkingInterval = $interval(me.checkDeviceStatus, 1000 * 60);
                    }
                }, function() {
                    me.isLoading = false;
                });

            },
            /**
             * @function updateBlockHeight
             * @description This Method to maintian the height of device cards same in the dashboard
             */
            updateBlockHeight: function() {
                $timeout(function() {
                    var userblocks, maxHeight;
                    userblocks = $('.user-status-container ');
                    maxHeight = 0;
                    angular.forEach(userblocks, function(block) {
                        if ($(block).height() > maxHeight) {
                            maxHeight = $(block).height();
                        }
                    });
                    $('.user-status-container ').height(maxHeight);
                }, 200);
            },
            /**
             * @function onMessageArrivedAws
             * @description This Method Listener function for aws iot device message event
             */
            onMessageArrivedAws: function() {
                var initialStatusCount = 0;
                MqttClientAws.device.on('message', function(topic, payload) {
                    console.log('in message: ', topic, payload.toString());
                    let stateObject = JSON.parse(payload.toString());
                    let topicSegment = topic.split('/');
                    let thingName = topicSegment[2];
                    let stat = topicSegment[topicSegment.length - 1];
                    let action = topicSegment[topicSegment.length - 2];
                    if ((stat === 'accepted' && action !== 'delete') && stateObject.state && stateObject.state.reported && stateObject.state.reported.ColorCode) {
                        // Check the shadow timestamp if the last updated was older than 60 * 10 secs:
                        if ((parseInt((Date.now() / 1000)) - parseInt(stateObject.metadata.reported.ColorCode.timestamp)) >= (60 * 10)) {
                            me.setDeviceStatusDisconnected(thingName);
                        } else {
                            me.setDeviceStatus(thingName, stateObject.state.reported.ColorCode);
                        }
                    } else if (((stat === 'rejected' && action === 'update') || action === 'delete') && me.deviceStates && me.deviceStates[thingName]) {
                        me.setDeviceStatusDisconnected(thingName);
                    }
                    if (stat === 'rejected' && action === 'get') {
                        if (me.deviceStates[thingName] && me.deviceStates[thingName].getStatusCount < 3) {
                            me.deviceStates[thingName].getStatusCount++;
                            $timeout(function() {
                                MqttClientAws.publishGetShadow(thingName);
                            }, 500);
                        } else {
                            me.setDeviceStatusDisconnected(thingName);
                        }
                    } else if (stat === 'accepted' && action === 'get') {
                        initialStatusCount++;
                        if (initialStatusCount >= me.deviceList.length) {
                            MqttClientAws.unregisterGetTopic();
                        }
                    }
                });
            },
            /**
             * @function onTimeoutAwsIot
             * @description This Method Listener function for aws iot device timeout event and change the device status to disconnected
             */
            onTimeoutAwsIot: function() {
                MqttClientAws.device.on('timeout', function(thingName) {
                    if (me.deviceStates && me.deviceStates[thingName]) {
                        me.setDeviceStatusDisconnected(thingName);
                    }
                });
            },
            /**
             * @function checkDeviceStatus
             * @description This method to check for device status in 15mins, and if there is no update change the status to disconnected
             */
            checkDeviceStatus: function() {
                if (me.deviceList) {
                    for (var i = 0; i < me.deviceList.length; i++) {
                        var deviceId = me.deviceList[i].DeviceId;
                        var devState = me.deviceStates[deviceId];
                        var now = new Date().getTime();
                        if (devState && (now - devState.lastUpdated) > 1000 * 60 * 15) {
                            me.setDeviceStatusDisconnected(deviceId);
                        }
                    }
                }
            },
            /**
             * @function setDeviceStatus
             * @description This method sets the status of the device on update state event fired.
             */
            setDeviceStatus: function(thingName, ColorCode) {
                if (me.deviceStates && me.deviceStates[thingName] && ColorCode) {
                    if (ColorCode === '255,0,0' && me.deviceStates[thingName].ColorCode !== '255,0,0') {
                        me.playSound();
                    }
                    me.deviceStates[thingName].lastUpdated = new Date().getTime();
                    me.deviceStates[thingName].ColorCode = ColorCode;
                }

                $scope.$apply();

                me.logMessages += 'got the msg for device : ' + thingName + ' time is: ' + new Date().toTimeString() + '<br/><hr/>';
            },
            /**
             * @function setDeviceStatusDisconnected
             * @description This method sets the status of the device as disconnected.
             */
            setDeviceStatusDisconnected: function(deviceId) {
                if (me.deviceStates && me.deviceStates[deviceId]) {
                    me.deviceStates[deviceId].lastUpdated = new Date().getTime();
                    me.deviceStates[deviceId].ColorCode = '0,0,255';
                    me.logMessages += ' not updated from long time ' + '<br/><hr/>';
                }
            },
            /**
             * @function onCloseAWSIot
             * @description This method is the listener function for aws iot device close event
             */
            onCloseAWSIot: function() {
                MqttClientAws.device.on('close', function() {
                    console.log('aws iot closed');
                    me.setDevicesDisconnected();
                });
            },
            /**
             * @function onErrorAWSIot
             * @description This method is the listener function for aws iot device error event
             */
            onErrorAWSIot: function() {
                MqttClientAws.device.on('error', function() {
                    console.log('aws iot error');
                    me.setDevicesDisconnected();
                });
            },
            /**
             * @function onOfflineAWSIot
             * @description This method is the listener function for aws iot device offline event
             */
            onOfflineAWSIot: function() {
                MqttClientAws.device.on('offline', function() {
                    console.log('aws iot offline');
                    me.setDevicesDisconnected();
                });
            },
            /**
             * @function updateElderDetails
             * @description This method is called from user details popup to change the device data on save edit details
             * @param {Object} data Required param, it holds the updated elder details that is edit from contact info popup
             */
            updateElderDetails: function(data) {
                angular.forEach(me.deviceList, function(device) {
                    if (device.DeviceId === data.DeviceId) {
                        device.elder = angular.copy(data.elder);
                    }
                });
                me.updateBlockHeight();
            },
            /**
             * @function setDevicesDisconnected
             * @description This method set the status of all devices as disconnected and changes the color to blue
             */
            setDevicesDisconnected: function() {
                if (me.deviceList) {
                    for (var i = 0; i < me.deviceList.length; i++) {
                        me.setDeviceStatusDisconnected(me.deviceList[i].DeviceId);
                    }
                }
            },
            /**
             * @function unregisterDevices
             * @description This method unsubscribes all the topics for all device, this once is called on the dashbaord page destroy
             */
            unregisterDevices: function() {
                MqttClientAws.unregister();
            },
            /**
             * @function disconnecDevices
             * @description This method disconnects the aws iot device connection
             */
            disconnecDevices: function() {
                MqttClientAws.disconnectDevice();
            },
            /**
             * @function openContactInfo
             * @description This method opens the elder details popup clicking on the device card
             */
            openContactInfo: function(device) {
                $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: require('../templates/contact-info.html'),
                    controller: 'ContactInfoCtrl',
                    controllerAs: 'contactInfoCtrl',
                    size: 'md',
                    windowClass: '',
                    resolve: {
                        device: function() {
                            return device;
                        },
                        updateElderDetails: function() {
                            return me.updateElderDetails;
                        }
                    }
                });
            }
        }).init();
    }
];
