users3 = [];
accounts3 = [];
firsts2 = [];
lasts2 = [];
idens2 = [];
users4 = [];
firsts3 = [];
lasts3 = [];
idens3 = [];

function posterAdd(posterId) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userId2 = user.uid;
            userEmail2 = user.email;

            db.collection("accounts").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    users4.push(doc.data().email);
                    accounts3.push(doc.data().firstname + " " + doc.data().lastname);
                    firsts3.push(doc.data().firstname);
                    lasts3.push(doc.data().lastname);
                    idens3.push(doc.id);
                });

                for (x = 0; x < idens3.length; x++) {
                    if (posterId === idens3[x]) {
                        posterAccount = accounts3[x];
                        alert(posterAccount + " added to Messaging List");
                        console.log(idens3);
                        fName3 = firsts3[x];
                        lName3 = lasts3[x];
                        //iden3 = idens3[x];
                        posterEmail2 = users4[x];
                        db.collection("friends").doc(userId2).collection(posterEmail2).add({ //adds poster to your friends list
                            email: posterEmail2,
                            firstname: fName3,
                            lastname: lName3,
                        })
                            .then((docRef) => {
                                //location.reload();
                            })
                            .catch((error) => {
                                console.error("Error adding document: ", error);
                            });

                        break;
                    }


                }
                for (y = 0; y < idens3.length; y++) {
                    if (userId2 === idens3[y]) {
                        userEmail2 = users4[y];
                        userFName2 = firsts3[y];
                        userLName2 = lasts3[y];
                        db.collection("friends").doc(posterId).collection(userEmail2).add({ //adds your name to their friends list
                            email: userEmail2,
                            firstname: userFName2,
                            lastname: userLName2,
                        })
                            .then((docRef) => {
                                //location.reload();
                            })
                            .catch((error) => {
                                console.error("Error adding document: ", error);
                            });
                        break;
                    }
                }

            });


        }
    });
}


