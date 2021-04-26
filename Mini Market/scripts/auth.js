
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

login.addEventListener('submit', (e) =>{
    console.log("Logging in...");
    e.preventDefault();
    const userEmail = login['user-email'].value;
    const userPassword = login['user-password'].value;

    // Attempt to Sign user in
    auth.signInWithEmailAndPassword(userEmail, userPassword).then(cred => {
        login.reset();
        window.location = "product_list.html";

        // if(true){
            // auth.currentUser.reload();
            // console.log(auth.currentUser.email_verified);
            // console.log(auth.currentUser.verificationId);
            // window.alert(auth.currentUser.emailVerified);
            // auth.signOut().then(r=>{console.log("Signed Out")});
            // login.reset();
            // window.location = "product_list.html";
        // }
        // else{
        //     console.log("Resending Email");
        //     auth.currentUser.sendEmailVerification().then(e => {
        //         window.alert("Please verify your email by clicking on the link sent to the email entered. Please note that this email might get sent to your junk folder.");
        //     }).then(e => {
        //         auth.signOut().then(r => {
        //             login.reset();
        //             window.location = "index.html";
        //             });
        //         });
        //     }
        // })
    }).catch(e => {
            console.log(e);
            window.alert("Please make sure you entered your email and password correctly");
    })
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
