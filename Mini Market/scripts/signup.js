// signup
const signupForm = document.querySelector('#signup-form');
const signupContainer = document.querySelector('#signup');

signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const userEmail = signupForm['email'].value.concat("@psu.edu");
    console.log("Creating User");
    let userPassword = signupForm['password'].value;

    // If passwords don't match, reset form and log it
    if(!(userPassword === signupForm['confirmPassword'].value)){
        console.log("Passwords are the different");
        signupForm.reset();
        return;
    }

    // Attempt to create user with proposed email, password, Bio, First and last name and their desired campus
    auth.createUserWithEmailAndPassword(userEmail, userPassword).then(cred => {
        return db.collection('accounts').doc(cred.user.uid).set({
            firstname: signupForm['first-name'].value,
            lastname: signupForm['last-name'].value,
            campus: signupForm['campus'].value,
            phone: signupForm['phone'].value,
            email: signupForm['email'].value + "@psu.edu",
        })
    }).then(() => {
        console.log("User Created")
        signupForm.reset();
        signupContainer.style.display="none";
        window.location = "index.html";
    }).catch(reason => {
        console.log("This is the reason: " + reason);
    });
});