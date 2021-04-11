
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



  });

  */


<!-- conditional menu links -->
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountInfo = document.querySelector('.account-details');

//
// const setupUI = (user) => {
//     if (user){
//         // db.collection('accounts').doc(user.uid).get().then(doc =>{
//         //     const html = `<div> Logged in as ${user.email}</div>
//         //               <div> Name is ${doc.data().name}</div>
//         //               <div> Campus is ${doc.data().campus}</div>
//         //               <div> Biography: ${doc.data().bio}</div>
//         //               <div> Your Items: ${doc.data().usersItems}</div>   `;
//         //     accountInfo.innerHTML = html;
//         // });
//
//         loggedInLinks.forEach(item => item.style.display = 'block');
//         loggedOutLinks.forEach(item => item.style.display = 'none');
//     }
//     else{
//         loggedInLinks.forEach(item => item.style.display = 'none');
//         loggedOutLinks.forEach(item => item.style.display = 'block');
//     }
// }
