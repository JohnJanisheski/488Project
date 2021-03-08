
/*
 function getContent(fragmentId, callback){
     var pages = {
         home: "This is the Home page. Welcome to my site.",
         additem: "This page will add an item",
         contact: "Contact me on this page if you have any questions"
     };
     callback(pages[fragmentId;
 }
  /*
  function loadContent(){
      var contentDiv = document.getElementById("app"),
          fragmentId = location.hash.substr(1);
      getContent(fragmentId, function (content) {
          contentDiv.innerHTML = content;
      });
  }
  if(!location.hash) {
      location.hash = "#me";
  }
  /*
  loadContent();

  window.addEventListener("hashchange", loadContent)


  const account = document.querySelector('#account-details');
  const checkUser = (user) => {
      if (user) {
          db.collection('accounts').doc(user.uid).get().then(doc => {
              const html = '<div>Logged in as ${user.email}</div>' +
                  '<div>${doc.data().bio}</div>';
              accountDetails.innerHTML = html;
          });
      }
      else{
          account.innerHTML = '';
      }
  };

  document.addEventListener('DOMContentLoaded', function (){
     // var modals = document.querySelectorAll('.modal');
    //  M.Modal.init(modals);

      var items = document.querySelectorAll('.collapsible');
      M.Collapsible.init(items);



  });

  */

//
// const itemList = document.querySelector('.itemslist').get()
// const setUpItems = (data) => {
//
//     let html = '';
//     data.forEach(doc => {
//         const item = doc.data();
//         console.log(item);
//         const li = '<li>' +
//             '<div> ${item.title} < /div>' +
//             '<div>${item.description}</div>' +
//             '<div>${item.itemType}</div> </li>';
//         html += li;
//     });
//     itemList.innerHTML = html;
// };


<!-- conditional menu links -->
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountInfo = document.querySelector('.account-details');


const setupUI = (user) => {
    if (user){
        db.collection('accounts').doc(user.uid).get().then(doc =>{
            const html = `<div> Logged in as ${user.email}</div>
                      <div> Name is ${doc.data().name}</div>
                      <div> Campus is ${doc.data().campus}</div>
                      <div> Biography: ${doc.data().bio}</div>   `;
            accountInfo.innerHTML = html;
        });

        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }
    else{
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}





























