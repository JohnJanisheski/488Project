function addFriend(){
    users = [];
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
                console.log(doc.data().firstname);
                users.push(doc.data().firstname);
                //console.log(users);


            });
            if (users.includes(friend)) {
                alert("User Added");
                users3.push(friend); //This would add to the user's list of friends
            }

            if(!users.includes(friend)){
                alert("Email is not in the system");
            }
        });




    }



}
