const message = firebase.messaging();
message.requestPermission()
.then(function() {
    console.log('Have permission'); //User Can Allow or Deny messages
})
.catch(function(err) {
    console.log('Error Occured.')
})

// sending new message
const createMessageForm = document.querySelector('#sendNewMessageForm');
createMessageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let user = firebase.auth().currentUser;
    let uid;
    let senderid = createMessageForm['recEmail'].value;
    console.log(senderid);
    if(user){
        uid = user.uid;
        console.log(uid);
    }// Create new document that has the message sent to the other user
    db.collection('inbox').doc(uid).collection(senderid).add({
        newMessage: createMessageForm['newMessage'].value,
        userId: uid,
    })
        .then((docRef) => {
            createMessageForm.reset();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
});