
<!-- "Firebase auth tutorial creating new users -->
<!-- www.youtube.com/watch?v=wkdCpktUfGg&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=5  -->

const itemlist = document.querySelector('.itemslist');
<!-- auth state changes -->
auth.onAuthStateChanged(user => {
    if (user){
        console.log('user logged in: ', user);
        db.collection('items').onSnapshot(snapshot => {
            let newChange = snapshot.docChanges();
            newChange.forEach((change => {
                if (change.type == 'added'){
                    renderList(change.doc);
                }
                else if (change.type == 'removed'){
                    let li = itemlist.querySelector('[data-id=' + change.doc.id + ']');
                    itemlist.removeChild(li);
                }
            }))
        });
        setupUI(user);
    }
    else{
        console.log('user logged out');
        setupUI();
    }
});


<!-- login current users -->
const login = document.querySelector('#login-form');
const loginContainer = document.querySelector('#login');

login.addEventListener('submit', (e) =>{
    e.preventDefault();
    const userEmail = login['login-email'].value;
    const userPassword = login['login-password'].value;

    // Attempt to Sign user in
    auth.signInWithEmailAndPassword(userEmail, userPassword).then(cred => {
        login.reset();
        loginContainer.style.display="none";

    }); // Error Handling Still needs to be implemented
});

<!-- logout -->
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});
// Sign the user out and go back to default page


// signup
const signupForm = document.querySelector('#signup-form');
const signupContainer = document.querySelector('#signup');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmail = signupForm['signup-email'].value;
    const userPassword = signupForm['signup-password'].value;

    // Attempt to create user with proposed email, password, Bio, First and last name and their desired campus
    auth.createUserWithEmailAndPassword(userEmail, userPassword).then(cred => {
        return db.collection('accounts').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value,
            firstname: signupForm['signup-first-name'].value,
            lastname: signupForm['signup-last-name'].value,
            campus: signupForm['signup-campus'].value,
        })

    }).then(() => {
        signupForm.reset();
        signupContainer.style.display="none";
    });
});


<!-- conditional menu links -->
document.getElementById("log-in-button").addEventListener("click", () => {
    document.getElementById("add-item").style.display="none";
    document.getElementById("login").style.display="block";
    document.getElementById("signup").style.display="none";
    document.getElementById("items-added").style.display="none";

}, false);

document.getElementById("sign-up-button").addEventListener("click", () => {
    document.getElementById("add-item").style.display="none";
    document.getElementById("login").style.display="none";
    document.getElementById("signup").style.display="block";
    document.getElementById("items-added").style.display="none";
}, false);


<!-- www.youtube.com/watch?v=zpQle4SBRfg&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&index=4&t=24s -->
<!-- show items list -->

function renderList(doc){
    let li = document.createElement('li');
    let title = document.createElement('span');
    let desc = document.createElement('span');
    let type = document.createElement('span');
    let del = document.createElement('del');

    li.setAttribute('data-id', doc.id);
    title.textContent = doc.data().title;
    desc.textContent = doc.data().description;
    type.textContent = doc.data().type;
    del.textContent = 'X';

    li.appendChild(title);
    li.appendChild(desc);
    li.appendChild(type);
    li.appendChild(del);
    itemlist.appendChild(li);

    //delete item
    del.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('items').doc(id).delete();
    });
}

const addItemsForm = document.querySelector('#add-item-form');
addItemsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let user = firebase.auth().currentUser;
    var uid, itemId;

    if(user){
        uid = user.uid;
        console.log(uid);
    }
    db.collection('items').add({
        title: addItemsForm['title'].value,
        description: addItemsForm['description'].value,
        type: addItemsForm['type'].value,
        userId: uid
    }).then(docRef => {
        console.log(docRef.id);
        itemId = String.valueOf(docRef.id);
        addItemsForm.reset();
    });

    console.log(itemId);
    db.collection('accounts').doc(uid).collection('userItems').add({
        title: addItemsForm['title'].value,
        description: addItemsForm['description'].value,
        type: addItemsForm['type'].value
    }).then(() => {
        addItemsForm.reset();
    })
});