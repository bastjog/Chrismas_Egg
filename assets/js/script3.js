var cpt = 0;
function move() {
    console.log("test");
    var bouton = document.getElementById("moveButton");
    pos_x = Math.round(Math.random()*window.innerWidth);
    pos_y = Math.round(Math.random()*window.innerHeight);

    bouton.style.left = pos_x + "px";
    bouton.style.top = pos_y + "px";

    cpt++;

    if (cpt > 10) {
        document.getElementById("message").style.display = "flex";
    }

}