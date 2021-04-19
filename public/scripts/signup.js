const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();
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
});
