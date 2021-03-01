// const setUpItems = (data) => {
//
//     let html = '';
//     data.forEach(doc => {
//         const item = doc.data();
//         console.log(item);
//         const li = '<li>' +
//             '<div class="collapsible-header" > ${item.title} < /div>' +
//             '<div class = "collapsible-body">${item.description}</div>' +
//             '<div className="collapsible-body">${item.itemType}</div> </li>';
//         html += li;
//     });
//         itemList.innerHTML = html;
// };

document.addEventListener('DOMContentLoaded', function (){
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);



});
