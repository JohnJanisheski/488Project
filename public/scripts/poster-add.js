users3 = [];
accounts3 = [];
firsts2 = [];
lasts2 = [];
idens2 = [];
users4 = [];
firsts3 = [];
lasts3 = [];
idens3 = [];
friends2 = [];
photoURL1 = [];
photoURL2 = [];

function posterAdd(posterId) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userId2 = user.uid;
            userEmail2 = user.email;

            db.collection("friends").doc(posterId).collection(userEmail2).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    friends2.push(doc.data().email);


                });
                if (friends2.includes(userEmail2)) {
                    alert("Email is already on messaging list");

                }

                else {

                    db.collection("accounts").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            users4.push(doc.data().email);
                            accounts3.push(doc.data().firstname + " " + doc.data().lastname);
                            firsts3.push(doc.data().firstname);
                            lasts3.push(doc.data().lastname);
                            photoURL1.push(doc.data().downloadURL);
                            idens3.push(doc.id);
                        });

                        for (x = 0; x < idens3.length; x++) {
                            if (posterId === idens3[x]) {
                                posterAccount = accounts3[x];
                                console.log(idens3);
                                fName3 = firsts3[x];
                                lName3 = lasts3[x];
                                pURL = photoURL1[x];
                                //iden3 = idens3[x];
                                posterEmail2 = users4[x];
                                if (posterEmail2  === userEmail2) {
                                    alert("Cannot add yourself");
                                    location.reload();
                                }
                                else {
                                    alert(posterAccount + " added to Messaging List");
                                    db.collection("friends").doc(userId2).collection(posterEmail2).add({ //adds poster to your friends list
                                        email: posterEmail2,
                                        firstname: fName3,
                                        lastname: lName3,
                                        downloadURL: pURL,
                                    })
                                        .then((docRef) => {
                                            //location.reload();
                                        })
                                        .catch((error) => {
                                            console.error("Error adding document: ", error);
                                        });
                                }

                                break;
                            }


                        }
                        for (y = 0; y < idens3.length; y++) {
                            if (userId2 === idens3[y]) {
                                userEmail2 = users4[y];
                                userFName2 = firsts3[y];
                                userLName2 = lasts3[y];
                                user_pURL = photoURL1[y];
                                db.collection("friends").doc(posterId).collection(userEmail2).add({ //adds your name to their friends list
                                    email: userEmail2,
                                    firstname: userFName2,
                                    lastname: userLName2,
                                    downloadURL: user_pURL,
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
    });
}


