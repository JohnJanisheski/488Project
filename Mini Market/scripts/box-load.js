var htmlElements = "";
var boxes = document.getElementById("friendBoxes");
//users3 = ["John", "Tyler", "Yuhui", "Laura"] //This is the user's list of friends will be in the database not hardcoded
users3 =[] //firstnames
userEmails = [];
currEmails = [];
currAccounts = [];
count = [];
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //console.log(user.uid); //Returns THE CURRENT USER
        userId = user.uid;
        userEmail = user.email;

        db.collection("accounts").get().then((querySnapshot) => {//Adds all of emails in the database to a list
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                //console.log(doc.data().firstname);
                //users3.push(doc.data().firstname);
                userEmails.push(doc.data().email);
            });



            for(x = 0; x<userEmails.length;x++) {
                    db.collection("friends").doc(userId).collection(userEmails[x]).get().then((querySnapshot) => {//Adds all of emails in the database to a list
                        querySnapshot.forEach((doc) => {
                            //console.log(doc.data().email);
                            //console.log(doc.data().firstname);
                            users3.push(doc.data().firstname + " " + doc.data().lastname);
                            //console.log(x);
                            //console.log(count);

                            for (var i = 0; i < users3.length; i++) {
                                if(!count.includes(i)) {
                                htmlElements += '<div class="userTitle2 " onclick= changeTitle(' + i + ')>\n' +
                                    '                    <img src="./img/thinkinJava1.jpg" style="width: 45px; height: 45px; border-radius: 22.5px;">\n' +
                                    '                    <span id = "buddy' + i + '" style="margin-left: 15px;font-size: 32;font-weight: 500;"></span></div>';
                                //console.log(count);

                                    count.push(i);

                                }

                            }

                            boxes.innerHTML = htmlElements;
                            boxGroup = [];
                            for (y = 0; y < users3.length; y++) {
                                box = document.getElementById("buddy" + y);
                                //console.log(y);
                                //console.log(users3[y]);
                                box.innerText = users3[y];
                                boxGroup.push(box);
                                //console.log(boxGroup);
                            }


                        });



                    });
                }



        });



    }

});






function loadUser() {
    eMail = firebase.auth().currentUser.email;
    //console.log(eMail);
    accounts = [];
    eMails = [];


    db.collection("accounts").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());
            //console.log(doc.data().email);
            eMails.push(doc.data().email);
            accounts.push(doc.data().firstname + " " + doc.data().lastname);
        });
        for (i = 0; i < eMails.length; i++) {
            //console.log(eMails[i]);
            if (eMail === eMails[i]) {
                console.log(accounts[i]);
                document.getElementById("user").innerText = accounts[i];
            }

        }
    });
}

function changeTitle(y) {
    accounts2 = [];
    eMails2 = [];
    box2 = document.getElementById("buddy" + y);
    console.log(box2.innerText);
    document.getElementById("uT").innerText = document.getElementById("buddy" + y).innerText;
    //console.log(firebase.auth().currentUser.email);
    person = box2.innerText;
    loadUser();
    db.collection("accounts").get().then((querySnapshot) => {//Adds all of emails in the database to a list
        querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());
            //console.log(doc.data().email);
            eMails2.push(doc.data().email);
            accounts2.push(doc.data().firstname + " " + doc.data().lastname);
        });
        for(x = 0; x<accounts2.length;x++) {
            if (person === accounts2[x]) {
                console.log(eMails2[x]);
                personEmail = eMails2[x];

            }
        }

        recipient(personEmail);
    });
    htmlElements2 = '';
    loadMessages(person);


}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //console.log(user);
        currUser = user.email;
        db.collection("accounts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                //console.log(doc.data().email);
                currEmails.push(doc.data().email);
                currAccounts.push(doc.data().firstname + " " +  doc.data().lastname);
            });
            for (i = 0; i < currEmails.length; i++) {
                if (currUser === currEmails[i]) {
                    document.getElementById("user").innerText = currAccounts[i];
                }

            }


        });
    }
});
