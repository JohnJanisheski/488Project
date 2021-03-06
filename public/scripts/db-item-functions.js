// This file will hold all of the functions used to communicate items with the db
// Validate User input items into the form
function validateForm() {
    console.log("Validating...")
    let image = document.forms["upload_item_form"]["imageRefText"].value;
    let itemName = document.forms["upload_item_form"]["itemName"].value;
    let description = document.forms["upload_item_form"]["description"].value;
    let listingPrice = document.forms["upload_item_form"]["price"].value;
    let condition = document.forms["upload_item_form"]["condition"].value;
    let type = document.forms["upload_item_form"]["type"].value;
    let campus = document.forms["upload_item_form"]["campus"].value;

    if (itemName === "") {
        alert("Name must be filled out");
        return false;
    }
    else if(description === ""){
        alert("Please enter a description");
        return false;
    }
    else if(listingPrice === "" || listingPrice < 0 || isNaN(listingPrice)){
        alert("Please enter a valid number for Price");
        return false;
    }
    else if(condition.includes("Choose")){
        alert("Please select a condition");
        return false;
    }
    else if(type.includes("Choose")){
        alert("Please select a valid Type");
        return false;
    }
    else if(campus.includes("Choose")){
        alert("Please select a valid Campus");
        return false;
    }
    else{
        if(image === "")
            document.forms["upload_item_form"]["imageRefText"].value = "images/questionMark.png"
        console.log("Valid");
        return true;
    }
}

const addItemsForm = document.querySelector('#upload_item_form');
addItemsForm.addEventListener('submit', (e) => {
    //prevents reloading the page
    e.preventDefault();


    let user = firebase.auth().currentUser;
    let uid;
    if(user){
        uid = user.uid;
    }

    if(validateForm()) {
        db.collection('items').add({
            imageRef: addItemsForm['imageRefText'].value,
            itemName: addItemsForm['itemName'].value,
            description: addItemsForm['description'].value,
            price: addItemsForm['price'].value,
            condition: addItemsForm['condition'].value,
            type: addItemsForm['type'].value,
            campus: addItemsForm['campus'].value,
            userId: uid,
            timestamp: Date.now(),
        })
            .then(x => { alert("Your Item has successfully been uploaded!"); addItemsForm.reset(); window.close()});
    }
});

// Remove Item
function removeItem(x, y){
    db.collection("items").doc(x).delete().then(e => {
        if(!(y === "images/questionMark.png")) {
            storageRef.child(y).delete().then(e => {
                window.location="myShop.html";
            })
        }
        else
            window.location="myShop.html";
    })
}
// Find My Items
// Find all items/Find Specific Items
