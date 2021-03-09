const message = firebase.messaging();

message.requestPermission()
    .then(function() {
        console.log('Have permission'); //User Can Allow or Deny messages
        return message.getToken();
    })
    .then(function(token) {
        console.log(token);
    })
    .catch(function(err) {
        console.log('Error Occured.')
    })

