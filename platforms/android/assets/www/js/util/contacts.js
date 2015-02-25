define('util/contacts', function(require) {

  var exports = {};

  exports.getAll = function() {
    return new RSVP.Promise(function(resolve, reject) {
      var fields = [
        navigator.contacts.fieldType.displayName,
        navigator.contacts.fieldType.name,
        navigator.contacts.fieldType.nickname,
        navigator.contacts.fieldType.phoneNumbers ];
      navigator.contacts.find(fields, function(contacts) { resolve(mapContacts(contacts)); }, reject);
    });
  };

  var mapContacts = function(contacts) {
    var result = {};
    for (var c in contacts) {
      var name = contacts[c].displayName || contacts[c].nickname || contacts[c].name;
      var phoneNumbers = contacts[c].phoneNumbers;
      result[name] = phoneNumbers;
    }
    return result;
  };

  return exports;

});