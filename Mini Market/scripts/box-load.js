var htmlElements = "";
var boxes = document.getElementById("friendBoxes");
users3 = ["John", "Tyler", "Yuhui", "Laura"] //This is the user's list of friends will be in the database not hardcoded
console.log(users3);
for (var i = 0; i < users3.length; i++) {
    htmlElements += '<div class="userTitle2 " onclick= changeTitle('+i+')>\n' +
        '                    <img src="./img/thinkinJava1.jpg" style="width: 45px; height: 45px; border-radius: 22.5px;">\n' +
        '                    <span id = "buddy' + i + '" style="margin-left: 15px;font-size: 32;font-weight: 500;"><script>console.log(i);</script></span></div>';


}

boxes.innerHTML = htmlElements;
boxGroup = [];
for (x = 0; x<users3.length; x++){
    box = document.getElementById("buddy" + x);
    box.innerText = users3[x];
    boxGroup.push(box);

}

function changeTitle(y){
    box2 = document.getElementById("buddy" + y);
    console.log(box2.innerText);
    document.getElementById("uT").innerText = document.getElementById("buddy" + y).innerText;


}

