const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(validSignUpForm()){
        const userEmail = signupForm['email'].value.concat("@psu.edu");
        console.log("Creating User");
        let userPassword = signupForm['password'].value;

        // If passwords don't match, reset form and log it
        if(!(userPassword === signupForm['confirmPassword'].value)){
            window.alert("Your Passwords did not match!");
            return;
        }

        auth.createUserWithEmailAndPassword(userEmail, userPassword).then(cred => {
            db.collection('accounts').doc(cred.user.uid).set({
                downloadURL: "https://firebasestorage.googleapis.com/v0/b/mini-market-aa3c4.appspot.com/o/icons%2Fprofileimage.jpg?alt=media&token=6830f44b-9b37-46f8-a72e-a501428335dc",
                firstname: signupForm['first-name'].value,
                lastname: signupForm['last-name'].value,
                campus: signupForm['campus'].value,
                phone: signupForm['phone'].value,
                email: signupForm['email'].value.concat("@psu.edu"),
            }).then(e => {
                auth.currentUser.sendEmailVerification().then(e => {
                    window.alert("Please verify your email by clicking on the link sent to the email entered. Please note that this email might get sent to your junk folder.");
                    // Attempt to create user with proposed email, password, Bio, First and last name and their desired campus
                }).then(e => {
                    signupForm.reset();
                    window.location = "index.html";
                }).catch(reason => {
                    window.alert(reason);
                })
            })
        })
    }
});

function validSignUpForm(){
    let first = signupForm['first-name'].value;
    let last = signupForm['last-name'].value;
    let campus = signupForm['campus'].value;
    let phone = signupForm['phone'].value;
    let email = signupForm['email'].value.concat("@psu.edu");

    if(signupForm['password'] === '')       {window.alert("Please enter a password");           return false;}
    else if(first === "")                   {window.alert("Please enter a valid First Name");   return false;}
    else if(last === "")                    {window.alert("Please enter a valid Last Name");    return false;}
    else if(campus === "Choose a Campus")   {window.alert("Please select a Campus");            return false;}
    else if(phone === "")                   {window.alert("Please enter a phone number");       return false;}
    else if(email === "")                   {window.alert("You must enter an email");           return false;}
    return true;
}
//
// // for testing without validation
//         }).then(() => {
//             console.log("User Created")
//             signupForm.reset();
//             window.location = "index.html";
//         }).catch(reason => {
//             console.log("This is the reason: " + reason);
//         });
//     });})
