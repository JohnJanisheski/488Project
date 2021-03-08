
<!-- "Firebase auth tutorial creating new users -->
<!-- www.youtube.com/watch?v=wkdCpktUfGg&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=5  -->


<!-- auth state changes -->
auth.onAuthStateChanged(user => {
    if (user){
        console.log('user logged in: ', user);
        db.collection('items').onSnapshot(snapshot => {
            snapshot.docs.forEach(doc =>{
                console.log(doc.data());
                renderList(doc);
            })
        });
        setupUI(user);


    }
    else{
        console.log('user logged out');
        setupUI();
        itemlist.innerHTML = '<h5 class="center-align">Login to view items!</h5>'
    }
});


<!-- login current users -->
const login = document.querySelector('#login-form');
const loginContainer = document.querySelector('#login');

login.addEventListener('submit', (e) =>{
    e.preventDefault();
    const userEmail = login['login-email'].value;
    const userPassword = login['login-password'].value;

    auth.signInWithEmailAndPassword(userEmail, userPassword).then(cred => {
        login.reset();
        loginContainer.style.display="none";

    });
});

<!-- logout -->
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});


// signup
const signupForm = document.querySelector('#signup-form');
const signupContainer = document.querySelector('#signup');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmail = signupForm['signup-email'].value;
    const userPassword = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(userEmail, userPassword).then(cred => {
        return db.collection('accounts').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value,
            name: signupForm['signup-name'].value,
            campus: signupForm['signup-campus'].value,
        })

    }).then(() => {
        signupForm.reset();
        signupContainer.style.display="none";
    });
});


<!-- conditional menu links -->
document.getElementById("log-in-button").addEventListener("click", () => {
    document.getElementById("additem").style.display="none";
    document.getElementById("login").style.display="block";
    document.getElementById("signup").style.display="none";
    document.getElementById("itemsadded").style.display="none";

}, false);

document.getElementById("sign-up-button").addEventListener("click", () => {
    document.getElementById("additem").style.display="none";
    document.getElementById("login").style.display="none";
    document.getElementById("signup").style.display="block";
    document.getElementById("itemsadded").style.display="none";
}, false);


<!-- www.youtube.com/watch?v=zpQle4SBRfg&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&index=4&t=24s -->
<!-- show items list -->
const itemlist = document.querySelector('.itemslist');

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

    del.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('items').doc(id).delete();
    });
}

const addItemsForm = document.querySelector('#add-item-form');
addItemsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('items').add({
        title: addItemsForm['title'].value,
        description: addItemsForm['description'].value,
        type: addItemsForm['type'].value
    }).then(() => {
        addItemsForm.reset();
    })
});




