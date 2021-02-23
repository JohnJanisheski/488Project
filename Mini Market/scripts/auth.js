
<!-- "Firebase auth tutorial creating new users -->
<!-- www.youtube.com/watch?v=wkdCpktUfGg&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=5  -->

<!-- auth state changes -->
auth.onAuthStateChanged(user => {
    if (user){
        console.log('user logged in: ', user)
    }
    else{
        console.log('user logged out');
    }
})


// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmail = signupForm['signup-email'].value;
    const userPassword = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(userEmail, userPassword).then(credential => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

<!-- logout -->
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

<!-- login current users -->
const login = document.querySelector('#login-form')
login.addEventListener('submit', (e) =>{
    e.preventDefault();
    const userEmail = login['login-email'].value;
    const userPassword = login['login-password'].value;

    auth.signInWithEmailAndPassword(userEmail, userPassword).then(cred => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        login.reset();
    });
});