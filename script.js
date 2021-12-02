function test() {
    var image = document.getElementById("test");
    image.style.visibility = "hidden";  
}

function popupHelp() {
    alert("Indice : son nom de famille est hashimoto");
}
function popupHelp2() {
    alert("Indice : Code Konami");
}

var etap1Token = 0;

function LoginEtap1(){
    var pseudo=document.login.pseudo.value;
    var username=pseudo.toLowerCase();
    console.log(username);
    if (username=="kazuhisa hashimoto") {
        var etap1 = document.getElementsByClassName("etap1");
        for (let i = 1; i < etap1.length; i++) {
            etap1[i].innerHTML="";
        }
        etap1[0].innerHTML="<p class='text_hashimoto etap2'> Oh vous êtes donc quelqu'un de cultivé, vous connaissez donc sa prouesse ?</p>";
        etap1[2].innerHTML="<div class='etap2'><button onclick='popupHelp2()'>Hints</button></div>";
        document.getElementById("hashimotoId").style.backgroundColor = "red";
        listKey = [];
    } else { 
        alert("Et non ce n'est pas lui"); 
    }
}

document.onkeydown = checkKey;
document.onkeypress = checkLetter;
var listKey = [];

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        listKey.push(1);
        console.log("up");
        // up arrow
    }
    else if (e.keyCode == '40') {
        listKey.push(2);
        console.log("down");
        // down arrow
    }
    else if (e.keyCode == '37') {
        listKey.push(3);
        console.log("left");
       // left arrow
    }
    else if (e.keyCode == '39') {
        listKey.push(4);
        console.log("right");
       // right arrow
    }
   
    var code = [1, 1, 2, 2, 3, 4, 3, 4];

    if (listKey.length == 8) {
        if (JSON.stringify(listKey) != JSON.stringify(code)) {
            listKey = [];
            alert("Attention reset");
        }
    }
}

function checkLetter(e) {
    e = e || window.event;

    if (e.keyCode == '97') {
        listKey.push('a');
    }
    else if (e.keyCode == '98') {
        listKey.push('b');
    }

    var codeFull = [1, 1, 2, 2, 3, 4, 3, 4, 'b', 'a'];

    if (listKey.length == 10) {
        if (JSON.stringify(listKey) == JSON.stringify(codeFull)) {
            codeKonami();
        }
        else {
            listKey = [];
            alert("Attention reset");
        }
    } 
    
}

function codeKonami(){
    if (document.getElementById("hashimotoId").style.backgroundColor == "red") {
        listKey = []
        var etap2 = document.getElementsByClassName("etap2");
        for (let i = 1; i < etap2.length; i++) {
            etap2[i].innerHTML="";
        }
        etap2[0].innerHTML = "<p>Wouah vous avez réussi à trouver le code secret mais, ce n'est pas encore fini que faire maintenant ?</p>"
    }
    else {
        console.log("Garde ça pour le prochain challenge petit coquin");
        listKey = [];
        alert("Attention reset");
    }
}
