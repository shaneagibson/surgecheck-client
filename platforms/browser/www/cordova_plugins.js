cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.pushapps.phonegap/www/pushapps.js",
        "id": "com.pushapps.phonegap.PushApps",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/src/browser/DeviceProxy.js",
        "id": "org.apache.cordova.device.DeviceProxy",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.pushapps.phonegap": "1.6.0",
    "org.apache.cordova.console": "0.2.12",
    "org.apache.cordova.device": "0.2.13"
}
// BOTTOM OF METADATA
});