function addFriend(){
    users = [];
    firsts =[];
    lasts = [];
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
                console.log(doc.id, " => ", doc.data());
                //console.log(doc.data().firstname);
                users.push(doc.data().email);
                firsts.push(doc.data().firstname);
                lasts.push(doc.data().lastname);
                //console.log(users);


            });
            if (users.includes(friend)) {
                alert("User Added");
                for (x = 0; x < users.length; x++) {
                    if (friend === users[x]) {
                        fName2 = firsts[x];
                        lName2 = lasts[x];
                        db.collection("friends").doc(userId).collection(friend).add({
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
            }

            if(!users.includes(friend)){
                alert("Email is not in the system");
            }
        });




    }



}
