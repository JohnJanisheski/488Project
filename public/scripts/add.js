function addFriend(){
    users = [];
    firsts =[];
    lasts = [];
    idens = [];
    friend = prompt("Enter the email of the friend you would like to add");
    console.log(friend);
    if (friend == null || friend == "") {
        //alert("Please enter a email");
        //console.log(name);
        //addFriend();
        return;
    }

    else{

        db.collection("accounts").get().then((querySnapshot) => {//Adds all of emails in the database to a list
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                //console.log(doc.data().firstname);
                users.push(doc.data().email);
                firsts.push(doc.data().firstname);
                lasts.push(doc.data().lastname);
                idens.push(doc.id);
                //console.log(users);


            });
            if (users.includes(friend)) {
                alert("Friend Added");
                for (x = 0; x < users.length; x++) {
                    if (friend === users[x]) {
                        fName2 = firsts[x];
                        lName2 = lasts[x];
                        iden2 = idens[x];
                        db.collection("friends").doc(userId).collection(friend).add({ //adds friend to your friends list
                            email: friend,
                            firstname: fName2,
                            lastname: lName2,
                        })
                            .then((docRef) => {
                                location.reload();
                            })
                            .catch((error) => {
                                console.error("Error adding document: ", error);
                            });


                    }
                }

                for (y = 0; y < idens.length; y++) {
                    if(userId === idens[y]) {
                        userEmail = users[y];
                        userFName = firsts[y];
                        userLName = lasts[y];
                        db.collection("friends").doc(iden2).collection(userEmail).add({ //adds your name to their friends list
                            email: userEmail,
                            firstname: userFName,
                            lastname: userLName,
                        })
                            .then((docRef) => {
                                location.reload();
                            })
                            .catch((error) => {
                                console.error("Error adding document: ", error);
                            });
                    }
                }
            }

            if(!users.includes(friend)){
                alert("Email is not in the system");
            }
        });




    }



}
