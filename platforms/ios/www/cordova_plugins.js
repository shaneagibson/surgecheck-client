cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.console/www/console-via-logger.js",
        "id": "org.apache.cordova.console.console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.console/www/logger.js",
        "id": "org.apache.cordova.console.logger",
        "clobbers": [
            "cordova.logger"
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
        "file": "plugins/com.pushapps.phonegap/www/pushapps.js",
        "id": "com.pushapps.phonegap.PushApps",
        "clobbers": [
            "PushNotification"
        ]
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
        "file": "plugins/nl.x-services.plugins.launchmyapp/www/ios/LaunchMyApp.js",
        "id": "nl.x-services.plugins.launchmyapp.LaunchMyApp",
        "clobbers": [
            "window.plugins.launchmyapp"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    },
    {
        "file": "plugins/com.clearbon.cordova.netswipe/www/NetSwipe.js",
        "id": "com.clearbon.cordova.netswipe.CardScanner",
        "clobbers": [
            "CardScanner"
        ]
    },
    {
        "file": "plugins/com.danielcwilson.plugins.googleanalytics/www/analytics.js",
        "id": "com.danielcwilson.plugins.googleanalytics.UniversalAnalytics",
        "clobbers": [
            "analytics"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.console": "0.2.12",
    "org.apache.cordova.device": "0.2.13",
    "com.pushapps.phonegap": "1.6.0",
    "nl.x-services.plugins.toast": "2.0.2",
    "nl.x-services.plugins.launchmyapp": "3.2.2",
    "org.apache.cordova.inappbrowser": "0.5.4",
    "com.clearbon.cordova.netswipe": "0.1.0",
    "com.danielcwilson.plugins.googleanalytics": "0.6.1"
}
// BOTTOM OF METADATA
});