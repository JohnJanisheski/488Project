// This file will hold all of the functions used to communicate items with the db
// Validate User input items into the form
function validateForm() {
    console.log("Validating...")
    let itemName = document.forms["upload-item-form"]["itemName"].value;
    let description = document.forms["upload-item-form"]["description"].value;
    let listingPrice = document.forms["upload-item-form"]["price"].value;
    let condition = document.forms["upload-item-form"]["condition"].value;
    let type = document.forms["upload-item-form"]["type"].value;
    let campus = document.forms["upload-item-form"]["campus"].value;

    if (itemName === "") {
        alert("Name must be filled out");
        return false;
    }
    else if(description === ""){
        alert("Please enter a description");
        return false;
    }
    else if(listingPrice === "" || listingPrice < 0){
        alert("Please enter a valid number");
        return false;
    }
    else if(condition === ""){
        alert("Please select a condition");
        return false;
    }
    else if(type === ""){
        alert("Please select a valid Type");
        return false;
    }
    else if(campus === ""){
        alert("Please select a valid Campus");
        return false;
    }
    else
        return true;
}

//Add an Item to the Database and to the user's account
const addItemsForm = document.querySelector('#upload-item-form');
addItemsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let user = firebase.auth().currentUser;
    let uid;
    if(user){
        uid = user.uid;
        console.log(uid);
    }
    if(validateForm()) {
        db.collection('items').add({
            itemName: addItemsForm['itemName'].value,
            // description: addItemsForm['']
            // price:
            // condition:
            // type:
            // campus:
            // userId: uid
            // title: addItemsForm['title'].value,
            // description: addItemsForm['description'].value,
            // type: addItemsForm['type'].value,
            // userId: uid
        })
            // This setup will create a collection that has a document for each item and inside each document
            //  is a reference to each item created by said user
            .then(docRef => {
                console.log(docRef.id);
                db.collection('accounts').doc(uid).collection('usersItems').add({
                    referenceValue: docRef.id,
                }).then(addItemsForm.reset());
            });
    }
});

// Remove Item
// Find My Items
// Find all items/Find Specific Items