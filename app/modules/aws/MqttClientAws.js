'use strict';
/**
 * A module that handles the aws iot related codes
 * @module AWS
 */
module.exports = ['$q', function($q) {

    // so we can use the member attributes inside our functions
    var client = {};

    // initialize attributes

    client.device = null;
    /**
     * @function uniqueId
     * @description a method that generates a unique id which will be used to create the aws iot device
     */
    function uniqueId() {
        // always start with a letter (for DOM friendlyness)
        var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
        do {
            // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
            var ascicode = Math.floor((Math.random() * 42) + 48);
            if (ascicode < 58 || ascicode > 64) {
                // exclude all chars between : (58) and @ (64)
                idstr += String.fromCharCode(ascicode);
            }
        } while (idstr.length < 10);
        return (idstr);
    }

    /**
     * @function getCredentials
     * @description a method that returns the aws credentials for logged in user
     */
    function getCredentials() {
        var deffered = $q.defer();
        AWS.config.credentials.refresh(() => {
            if (AWS.config.credentials) {
                const IoT = new AWS.Iot();
                console.log('AWS IoT object created');
                IoT.attachPolicy({
                    policyName: 'variablePolicy',
                    target: AWS.config.credentials.identityId
                }, (err) => {
                    if (err) {
                        deffered.reject(err);
                    } else {
                        if (AWS.config.credentials.data.Credentials) {
                            deffered.resolve(AWS.config.credentials);
                            console.log('Credentials obtained, attaching variablePolicy policy');
                        } else {
                            console.log('failed to get credentials');
                            deffered.reject(new Error('No credential found'));
                        }
                    }
                });
            }
        });

        return deffered.promise;
    }

    /**
     * @function subscribeShadows
     * @description a method that subscribes to all device topics to get, update & delete shadows
     */
    function subscribeShadows() {
        client.device.subscribe('$aws/things/+/shadow/get/accepted');
        client.device.subscribe('$aws/things/+/shadow/get/rejected');
        client.device.subscribe('$aws/things/+/shadow/update/accepted');
        client.device.subscribe('$aws/things/+/shadow/update/rejected');
        client.device.subscribe('$aws/things/+/shadow/delete/accepted');
    }
    /**
     * @function publishGetShadow
     * @description a method that subscribes to device's get, update & delete topic
     */
    function publishGetShadow(thingName) {
        client.device.publish('$aws/things/' + thingName + '/shadow/get', '');
    }
    /**
     * @function unregister
     * @description a method that unsubscribes to device's get, update & delete topic
     */
    function unregister() {
        if (client.device) {
            client.device.unsubscribe('$aws/things/+/shadow/get/accepted');
            client.device.unsubscribe('$aws/things/+/shadow/get/rejected');
            client.device.unsubscribe('$aws/things/+/shadow/update/accepted');
            client.device.unsubscribe('$aws/things/+/shadow/update/rejected');
            client.device.unsubscribe('$aws/things/+/shadow/delete/accepted');
        }
    }

    /**
     * @function dsiconnect device
     * @description a method that disconnect the aws iot device connection
     */
    function disconnectDevice() {
        if (client.device) {
            client.device.end();
            client.device = null;
        }
    }

    /**
     * @function unregisterGetTopic
     * @description a method that unsubscribes to device's get topic after getting the initial status
     */
    function unregisterGetTopic() {
        client.device.unsubscribe('$aws/things/+/shadow/get/accepted');
        client.device.unsubscribe('$aws/things/+/shadow/get/rejected');
    }
    /**
     * @function createClient
     * @description a method that creates aws iot device instance and returns a promise
     * which is resolved as the device is connected
     */
    function createClient() {
        var deffered = $q.defer();
        if (client.device) {
            deffered.resolve();
        } else {
            getCredentials().then(function(credentials) {
                console.log('Creatting a new device');

                var clientID = 'webapp:' + uniqueId() + new Date().getTime();
                client.device = AwsIot.device({
                    clientId: clientID,
                    host: 'a2vsvny1p3gucx.iot.eu-central-1.amazonaws.com',
                    accessKeyId: credentials.accessKeyId,
                    secretKey: credentials.secretAccessKey,
                    protocol: 'wss',
                    sessionToken: credentials.sessionToken,
                    offlineQueueing: 'false'
                });
                console.log('AWS device created id: ', clientID);

                //
                // Device is an instance returned by mqtt.Client(), see mqtt.js for full
                // documentation.
                //

                client.device.on('connect', function() {
                    console.log('device connected');
                    subscribeShadows();
                    deffered.resolve();
                });
            }, function(err) {
                deffered.reject(err);
            });
        }
        return deffered.promise;
    }

    // member functions
    client.createClient = createClient;
    client.publishGetShadow = publishGetShadow;
    client.unregister = unregister;
    client.unregisterGetTopic = unregisterGetTopic;
    client.disconnectDevice = disconnectDevice;

    return client;

}];