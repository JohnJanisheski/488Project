
<!-- "Firebase auth tutorial creating new users -->
<!-- www.youtube.com/watch?v=wkdCpktUfGg&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=5  -->

const itemlist = document.querySelector('.itemslist');
<!-- auth state changes -->
auth.onAuthStateChanged(user => {
    if (user){
        console.log("User is logged in");
        // window.location = 'product_list.html'; // This will automatically load product_list when auth is changed (This
        // // matched with the initialization of the firebase app at the bottom of product_list (Or any pages that we would
        // // like to load firebase on) will automatically load this page instead)  ***Need to find another way to redirect
        // // users after creating an account

        // db.collection('items').onSnapshot(snapshot => {
        //     let newChange = snapshot.docChanges();
        //     newChange.forEach((change => {
        //         if (change.type == 'added'){
        //             renderList(change.doc);
        //         }
        //         else if (change.type == 'removed'){
        //             let li = itemlist.querySelector('[data-id=' + change.doc.id + ']');
        //             itemlist.removeChild(li);
        //         }
        //     }))
        // });
        // setupUI(user); //Since we are using static connection methods we don't need a setupUI as it currently is
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

    // Attempt to Sign user in
    auth.signInWithEmailAndPassword(userEmail, userPassword).then(cred => {
        login.reset();
        loginContainer.style.display="none";
        window.location = "product_list.html";


    }); // Error Handling Still needs to be implemented
});

<!-- logout -->
// User is logged out when sent to index.html

// signup
const signupForm = document.querySelector('#signup-form');
const signupContainer = document.querySelector('#signup');

signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const userEmail = signupForm['email'].value;
    const userPassword = signupForm['password'].value;
    if(!userPassword === signupForm['confirmPassword'].value())
        return;

    // Attempt to create user with proposed email, password, Bio, First and last name and their desired campus
    auth.createUserWithEmailAndPassword(userEmail, userPassword).then(cred => {
        return db.collection('accounts').doc(cred.user.uid).set({
            firstname: signupForm['first-name'].value,
            lastname: signupForm['last-name'].value,
            campus: signupForm['signup-campus'].value,
            phone: signupForm['phone'].value,
        })
    }).then(() => {
        signupForm.reset();
        signupContainer.style.display="none";
    });
});