const message = firebase.messaging();
message.requestPermission()
.then(function() {
    console.log('Have permission'); //User Can Allow or Deny messages
    return messaging.getToken();
})
.catch(function(err) {
    console.log('Error Occured.');
})

