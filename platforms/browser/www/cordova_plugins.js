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
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/www/Toast.js",
        "id": "nl.x-services.plugins.toast.Toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/test/tests.js",
        "id": "nl.x-services.plugins.toast.tests"
    },
    {
        "file": "plugins/com.clearbon.cordova.netswipe/www/NetSwipe.js",
        "id": "com.clearbon.cordova.netswipe.CardScanner",
        "clobbers": [
            "CardScanner"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.pushapps.phonegap": "1.6.0",
    "org.apache.cordova.console": "0.2.12",
    "org.apache.cordova.device": "0.2.13",
    "nl.x-services.plugins.toast": "2.0.2",
    "nl.x-services.plugins.launchmyapp": "3.2.2",
    "org.apache.cordova.inappbrowser": "0.5.4",
    "com.clearbon.cordova.netswipe": "0.1.0"
}
// BOTTOM OF METADATA
});