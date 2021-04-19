
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
//
// login.addEventListener('submit', (e) =>{
//     console.log("Logging in...");
//     e.preventDefault();
//     const userEmail = login['user-email'].value;
//     const userPassword = login['user-password'].value;
//
//     // Attempt to Sign user in
//     auth.signInWithEmailAndPassword(userEmail, userPassword).then(cred => {
//         if(auth.currentUser.emailVerified){
//             login.reset();
//             loginContainer.style.display="none";
//             window.location = "product_list.html";
//         }
//         else{
//             auth.signOut().then(e => {
//                 window.alert("You must verify your email address!");
//                 login.reset();
//             });
//         }
//     }).catch(e => {
//             console.log(e);
//             // window.alert("Please make sure you entered your email and password correctly");
//         });
// });

// for testing without validation
login.addEventListener('submit', (e) =>{
    console.log("Logging in...");
    e.preventDefault();
    const userEmail = login['user-email'].value;
    const userPassword = login['user-password'].value;

    // Attempt to Sign user in
    auth.signInWithEmailAndPassword(userEmail, userPassword).then(cred => {
        login.reset();
        loginContainer.style.display="none";
        window.location = "product_list.html";


    });
});
<!-- logout -->
// User is logged out when sent to index.html
