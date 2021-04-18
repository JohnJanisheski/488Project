function recipient(){
    ///console.log("www " + personEmail)
}

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
    let senderid = personEmail;
    //console.log("www2" + senderid);
    if(user){
        uid = user.uid;
       // console.log(uid);
    }// Create new document that has the message sent to the other user

    db.collection("date").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            message_num = doc.data().date_increment + 1;
            db.collection("date").doc('YpFmsU7iMQcA9xrK1kfT').set({
                date_increment: message_num
            });
        });
            db.collection('inbox').doc(uid).collection(senderid).add({
                newMessage: createMessageForm['newMessage'].value,
                userId: uid,
                date: message_num,
            })
                .then((docRef) => {
                    createMessageForm.reset();
                    location.reload();
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        });
    });
