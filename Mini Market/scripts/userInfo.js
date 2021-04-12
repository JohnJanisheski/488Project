
auth.onAuthStateChanged(user => {
    db.collection('accounts').doc(user.uid).get().then(doc => {
        const info = doc.data();
        document.getElementsByName('email')[0].value=user.email;
        document.getElementsByName('account')[0].value = info.firstname + " " + info.lastname;
        document.getElementsByName('campus')[0].value=info.campus;
        document.getElementsByName('phoneNumber')[0].value=info.phone;
        document.getElementsByName('firstName')[0].value=info.firstname;
        document.getElementsByName('lastName')[0].value=info.lastname;

    });
});