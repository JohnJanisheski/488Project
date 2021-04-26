
<!-- "Firebase auth tutorial creating new users -->
<!-- www.youtube.com/watch?v=wkdCpktUfGg&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=5  -->

const itemlist = document.querySelector('.itemslist');
<!-- auth state changes -->
auth.onAuthStateChanged(user => {
    if (user){
        console.log("User is logged in");
    }
    else{
        console.log('User is logged out');
    }
});


<!-- login current users -->
const login = document.querySelector('#login-form');
const loginContainer = document.querySelector('#login');

login.addEventListener('submit', (e) =>{
    console.log("Logging in...");
    e.preventDefault();
    const userEmail = login['user-email'].value;
    const userPassword = login['user-password'].value;

    const credentials = firebase.auth.EmailAuthProvider.credential(userEmail, userPassword);

    // Attempt to Sign user in
    auth.signInWithEmailAndPassword(userEmail, userPassword).then(cred => {
        auth.currentUser.reauthenticateWithCredential(credentials).then(r => {
            if(auth.currentUser.email_verified){
                console.log("emailVerified: " + auth.currentUser.emailVerified);
                console.log("email_verified: " + auth.currentUser.email_verified);
                window.alert("CONSOLE");
                login.reset();
                loginContainer.style.display="none";
                window.location = "product_list.html";
            }
            else{
                console.log("Resending Email");
                auth.currentUser.sendEmailVerification().then(e => {
                    window.alert("Please verify your email by clicking on the link sent to the email entered. Please note that this email might get sent to your junk folder.");
                }).then(e => {
                    auth.signOut().then(r => {
                        login.reset();
                        window.location = "index.html";
                    });
                });
            }
        })
    }).catch(e => {
            console.log(e);
            window.alert("Please make sure you entered your email and password correctly");
        });
});
//
// // for testing without validation
// login.addEventListener('submit', (e) =>{
//     console.log("Logging in...");
//     e.preventDefault();
//     const userEmail = login['user-email'].value;
//     const userPassword = login['user-password'].value;
//
//     // Attempt to Sign user in
//     auth.signInWithEmailAndPassword(userEmail, userPassword).then(cred => {
//         login.reset();
//         loginContainer.style.display="none";
//         window.location = "product_list.html";
//
//
//     });
// });
<!-- logout -->
// User is logged out when sent to index.html
