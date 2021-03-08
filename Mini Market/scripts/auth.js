
<!-- "Firebase auth tutorial creating new users -->
<!-- www.youtube.com/watch?v=wkdCpktUfGg&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=5  -->

<!-- auth state changes -->
auth.onAuthStateChanged(user => {
    if (user){
        console.log('user logged in: ', user);
        db.collection('items').get().then(snapshot => {
            snapshot.docs.forEach(doc =>{
                console.log(doc.data());
                renderList(doc);
            })
        });

        itemlist.innerHTML = '';
    }
    else{
        console.log('user logged out');
        itemlist.innerHTML = '<h5 class="center-align">Login to view items!</h5>'
    }
});

const account = document.querySelector('#account-details');
const checkUser = (user) => {
    if (user) {
        const html = '<div>Logged in as ${user.email}</div>';
        account.innerHTML = html;
    }
    else{
        account.innerHTML = '';
    }
};

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get Users Email and Potential Password
    const userEmail = signupForm['signup-email'].value;
    const userPassword = signupForm['signup-password'].value;

    // Attempt to create new user
    auth.createUserWithEmailAndPassword(userEmail, userPassword).then(cred => {
        return db.collection('accounts').doc(cred.user.id).set({
            bio: signupForm['signup-bio'].value,
            firstName: signupForm['signup-first-name'].value,
            lastName: signupForm['signup-last-name'].value,
            campus: signupForm['signup-campus'].value,
        })

    }).then(() => {
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

<!-- add items -->
const addItemsForm = document.querySelector('#add-item-form');
addItemsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('items').add({
        title: addItemsForm['title'].value,
        description: addItemsForm['description'].value,
        type: addItemsForm['type'].value

    }).then(() => {
        const modal = document.querySelector('#modal-add');
        M.Modal.getInstance(modal).close();
        addItemsForm.reset();
    });
});


<!-- create profile -->
const accountForm = document.querySelector('#account-details-form');
accountForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('users').add({
        name: accountForm['name'].value,
        email: accountForm['email'].value,
        campus: accountForm['campus'].value,
        bio: accountForm['bio'].value

    }).then(() => {
        const modal = document.querySelector('#modal-add');
        M.Modal.getInstance(modal).close();
        accountForm.reset();
    });
});


<!-- www.youtube.com/watch?v=zpQle4SBRfg&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&index=4&t=24s -->
<!-- show items list -->
const itemlist = document.querySelector('.itemslist');

function renderList(doc){
    let li = document.createElement('li');
    let title = document.createElement('span');
    let desc = document.createElement('span');
    let type = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    title.textContent = doc.data().title;
    desc.textContent = doc.data().description;
    type.textContent = doc.data().type;

    li.appendChild(title);
    li.appendChild(desc);
    li.appendChild(type);
    itemlist.appendChild(li);
}






