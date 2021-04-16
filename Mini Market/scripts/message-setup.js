function loadMessages() {
    uIDS = [];
    uEmails = [];
    rec_messages = [];
    sent_messages = [];
    ids = [];
    ids2 = [];
    names = [];
    uID = firebase.auth().currentUser.uid;
    //clickedonemail = "user1@psu.edu";
    //console.log(uID);
    db.collection("accounts").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            uEmails.push(doc.data().email);
            uIDS.push(doc.id);
            names.push(doc.data().firstname + " " + doc.data().lastname);
            //console.log(users);


        });
        //GET USER's EMAIL
        for(z=0; z<uEmails.length;z++) {
            if (uID === uIDS[z]) {
                //console.log(accounts[i]);
                uEmail = uEmails[z];
            }
        }



        //GET THE EMAIL OF THE PERSON WHO WAS GOT YOUR MESSAGE AND GET ID OF PERSON WHO SENT YOU A MESSAGE
        for(x = 0; x<names.length;x++) {
            //console.log(uEmails[x]);
            //console.log("SENT   " + person + " " + uEmails[x]);
            if (person === names[x]) {
                sentEmail = uEmails[x];
                recID = uIDS[x];
                //console.log(recID + " hhh " + sentEmail);
            }
        }

        //LOADS MESSAGES SENT
        //ids.push(uEmails[x]);
        console.log(sentEmail);
        db.collection("inbox").doc(uID).collection(sentEmail).get().then((querySnapshot) => { //.doc(User's id), .collection(email of the person who got your message)
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                //console.log(doc.data().newMessage);
                sent_messages.push(doc.data().newMessage);
                //console.log(sentEmail +" aaaa " + sent_messages);
                //console.log(users);


            });
            console.log(sentEmail +" " + sent_messages);
            document.getElementById("sentMessage").innerText = sent_messages[0];

            //console.log(ids);

        });






        //LOADS MESSAGES RECEIVED
        //console.log("b" + uEmail);
        //console.log(db.collection("inbox").doc(uIDS[y]).collection(uEmail));
        db.collection("inbox").doc(recID).collection(uEmail).get().then((querySnapshot) => { //.doc(id of person who sent you a message), .collection(User's email)
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                //console.log(doc.data().newMessage);
                ids2.push(doc.data().userId);
                rec_messages.push(doc.data().newMessage);
                //console.log(users);


            });
            console.log(recID + " " + rec_messages);

            document.getElementById("recMessage").innerText = rec_messages[0];

        });








    });




}





