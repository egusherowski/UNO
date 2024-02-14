// Global Variables

let turn;
let deck = [];
let compdeck = [];
let playerdeck = [];
let reshufflepile = [];
let lastcard;
let compmostcolor;
let currentindex = 1;
let change;
let Interval = 0;
let sorted = false;

// Global Elements

let banner = document.getElementById("banner")
let up = document.getElementById("up");
let down = document.getElementById("down");

// Event Listeners

document.getElementById("startgame").addEventListener('click', startgame);
document.getElementById("Deck").addEventListener('click', userdraw);

let cards = document.getElementsByClassName("cards");
Array.from(cards).forEach(function(cards) {
    cards.addEventListener('click', laydown);
});

let colors = document.getElementsByClassName("square");
Array.from(colors).forEach(function(c) {
    c.addEventListener('click', changecolor);
});

let scroll = document.getElementsByClassName("scroll");
Array.from(scroll).forEach(function(s) {
    s.addEventListener('click', shiftcards);
});

Array.from(document.getElementsByClassName("minisquare")).forEach(function(s) {
    s.addEventListener('click', sortbybox)
});

// Starting Functions
function startgame(){
    document.getElementById("startgame").style.display = "none";
    document.getElementById("Deck").style.visibility = "visible";
    createdeck();
    initaldraw();
}

function createdeck() {
    for(let j = 0; j < 2; j++){
    for (let i = 0; i < 10; i++) {
        deck.push("r"+i);
    }}
    for(let i = 0; i < 2; i++){
        deck.push("rs");
        deck.push("r+");
        deck.push("rr");
    }
    for(let j = 0; j < 2; j++){
        for (let i = 0; i < 10; i++) {
            deck.push("b"+i);
        }}
    for(let i = 0; i < 2; i++){
        deck.push("bs");
        deck.push("b+");
        deck.push("br");
    }
    for(let j = 0; j < 2; j++){
        for (let i = 0; i < 10; i++) {
            deck.push("y"+i);
        }}
    for(let i = 0; i < 2; i++){
        deck.push("ys");
        deck.push("y+");
        deck.push("yr");
    }
    for(let j = 0; j < 2; j++){
        for (let i = 0; i < 10; i++) {
            deck.push("g"+i);
        }}
    for(let i = 0; i < 2; i++){
        deck.push("gs");
        deck.push("g+");
        deck.push("gr");
    }
        deck.push("wc");
        deck.push("w4");
        deck.push("wc");
        deck.push("w4");
}

// Card Drawing Functions

function drawcard(user){
    if(deck.length === 0){
        deck = reshufflepile;
        reshufflepile = [];
    }
    let index = Math.floor(Math.random() * deck.length);
    if(user === "computer"){
        compdeck.push(deck[index]);

    }
    else if(user === "player"){
        playerdeck.push(deck[index]);
        if(playerdeck.length > 7){
            document.getElementById("1").style.visibility = "visible";
        }
    }
    else{
        while(deck[index] === "wc" || deck[index] === "w4"){
            index = Math.floor(Math.random() * deck.length);
        }
        document.getElementById("lastlay").setAttribute("src", "Images/" + deck[index] + ".png");
        lastcard = deck[index];
    }
    deck.splice(index, 1);
}
function initaldraw(){
    for(let i = 1; i < 8; i++){
        drawcard("computer");
    }
    for(let i = 1; i < 8; i++){
        drawcard("player");
        document.getElementById("ps" + i).setAttribute("src", "Images/"+ playerdeck[i-1] + ".png")
    }
    drawcard();
    for(let i = 1; i < 8; i++){

window.setTimeout(function (){
    document.getElementById("cs" + i).style.visibility = "visible";
    document.getElementById("ps" + i).style.visibility = "visible";
}, i * 1000)
}
    window.setTimeout(function (){
        document.getElementById("lastlay").style.visibility = "visible";
        turn = "player";
        down.style.visibility = "visible";
        document.getElementById("counter").style.visibility = "visible";
        Array.from(document.getElementsByClassName("minisquare")).forEach(function(s) {
            s.style.display = "inline";
        });
        updateplayerhand();
    }, 8000);
}

function userdraw(){
    if(turn !== "player" || contains(playerdeck, lastcard[0], 0) || contains(playerdeck, lastcard[1], 1) || contains(playerdeck, "w", 0)){
        sortbyplayable();
        return;
    }
    else{
        clearInterval(Interval);
        Interval = 0;
        document.getElementById("left").style.visibility = "hidden";
        drawcard("player");
        let temp = playerdeck[0];
        playerdeck[0] = playerdeck[playerdeck.length-1];
        playerdeck[playerdeck.length-1] = temp;
        updateplayerhand();
    }
}

// Card Playing Functions

function laydown(){
    if(turn !== "player"){
        return;
    }
    banner.style.visibility = "hidden";
    turn = "computer";
    Array.from(document.getElementsByClassName("square")).forEach(function(s) {
        s.style.visibility = "hidden";
    });
    let num = parseInt(this.id[2]);
        num += currentindex -1;


    if((playerdeck[num-1] === "w4" && !contains(playerdeck, lastcard[0], 0) && !contains(playerdeck, lastcard[1], 1)) || playerdeck[num -1] === "wc" || playerdeck[num -1][0] === lastcard[0] || playerdeck[num -1][1] === lastcard[1]) {
        clearInterval(Interval);
        Interval = 0;
        Array.from(document.getElementsByClassName("minisquare")).forEach(function(m){
            m.style.display = "inline";
        });
        Array.from(document.getElementsByClassName("arrow")).forEach(function(a){
            a.style.visibility = "hidden";
        });
        sorted = false;
        document.getElementById("break").style.display = "block";
        document.getElementById("lastlay").setAttribute("src", "Images/" + playerdeck[num - 1] + ".png");
        lastcard = playerdeck[num -1];
        reshufflepile.push(playerdeck[num -1]);
        playerdeck[num-1] = playerdeck[playerdeck.length-1];
        playerdeck.pop();
      //  document.getElementById(this.id).setAttribute("src", "Images/" + playerdeck[num-1] + ".png");
        for(let i = playerdeck.length + 1; i < 8; i++){
            document.getElementById("ps" + i).style.visibility = "hidden";
        }

        if(playerdeck.length === 1){
            let banner = document.getElementById("banner")
                banner.innerHTML = "Player: \"UNO\"";
            banner.style.visibility = "visible";
        }
        if(playerdeck.length === 0){
            let banner = document.getElementById("banner")
            banner.innerHTML = "Player Wins";
            banner.style.visibility = "visible";
            endgame();
        }
        else{
            currentindex = 1;
        updateplayerhand();
            evaluatecard("player");}
    }
    else{
        turn = "player";
        if(contains(playerdeck, lastcard[0], 0) || contains(playerdeck, lastcard[1], 1) || contains(playerdeck, "w", 0)){
            sortbyplayable();
        }
        else{
            flashleftarrow();
        }
    }
}
function computerturn() {

    Array.from(document.getElementsByClassName("square")).forEach(function(s) {
        s.style.visibility = "hidden";
    });
    banner.style.visibility = "hidden";
    let bestmove = "null";
    let j = 0;
    while (bestmove === "null") {

        for (let i = 0; i < compdeck.length; i++) {
            if ((compdeck[i][1] === "s" && compdeck[i][0] === lastcard[0]) || (compdeck[i][1] === "r" && compdeck[i][0] === lastcard[0]) || (compdeck[i][1] === "+" && compdeck[i][0] === lastcard[0])) {
                bestmove = compdeck[i];
                j = i;
                break;
            }
            if (compdeck[i][0] === compmostcolor && compdeck[i][1] === lastcard[1]) {
                bestmove = compdeck[i];
                j = i;
                break;
            }
            if (compdeck[i][0] === lastcard[0] || compdeck[i][1] === lastcard[1]) {
                bestmove = compdeck[i];
                j = i;
            } else if (bestmove === "null" && compdeck[i][0] === "w") {
                bestmove = compdeck[i];
                j = i;
            }
        }
        if (bestmove === "null") {
            drawcard("computer");
            updatecomputerhand();
        }
    }
    window.setTimeout(function() {
    document.getElementById("lastlay").setAttribute("src", "Images/" + bestmove + ".png");
    lastcard = bestmove;
    reshufflepile.push(bestmove);
    compdeck.splice(j, 1);


    for (let i = compdeck.length + 1; i < 8; i++) {
        document.getElementById("cs" + i).style.visibility = "hidden";
    }
    if (compdeck.length === 1) {

        banner.innerHTML = "Computer: \"UNO\"";
        banner.style.visibility = "visible";
    }
    if (compdeck.length === 0) {
        banner.innerHTML = "Computer Wins";
        banner.style.visibility = "visible";
        document.getElementById("counter").innerHTML = " (" + compdeck.length + ")";
        endgame();
        return;
    } else {
        updatecomputerhand();

        evaluatecard("computer");
    }
}, 2000);
}
function evaluatecard(user){
    if(lastcard === "wc"){
        if(user === "player"){
            Array.from(document.getElementsByClassName("square")).forEach(function(s) {
                s.style.visibility = "visible";
            });
            change = "player";
        }
        else{
            computerchangecolor();

            document.getElementById(lastcard[0]).style.visibility = "visible";
            turn = "player";
            change = "no"
            down.style.visibility = "visible";
            up.style.visibility = "hidden";

        }
    }
    else if(lastcard === "w4"){
        turn = user
        if(user === "computer"){
            for(let i = 0; i < 4; i++){
                drawcard("player");
                updateplayerhand();
            }
            computerchangecolor();
            computerturn();
        }
        else{
            change = "player";
            Array.from(document.getElementsByClassName("square")).forEach(function(s) {
                s.style.visibility = "visible";
            });
            for(let i = 0; i < 4; i++){
                drawcard("computer");
                updatecomputerhand();
            }
        }
    }
    else if(lastcard[1] === "r" || lastcard[1] === "s"){
        turn = user;
        if(user === "computer"){
            computerturn();
        }
    }
    else if(lastcard[1] === "+"){
        turn = user;
        if(user === "computer"){
            drawcard("player");
            drawcard("player");
            updateplayerhand();
            computerturn();
        }
        else{
            drawcard("computer");
            drawcard("computer");
            updatecomputerhand();
        }
    }
    else{
        if(user === "player"){
            down.style.visibility = "hidden";
            up.style.visibility = "visible";
            computerturn();
        }
        else{
            turn = "player";
            down.style.visibility = "visible";
            up.style.visibility = "hidden";
        }
    }
}
function contains(array, char, index){
    for(let i = 0; i < array.length; i++){
        if(array[i][index] === char){
            return true;
        }
    }
    return false;
}

// Color Changing Functions

function changecolor(){
    if(change !== "player" || lastcard[0] !== "w"){
        return;
    }
    else{
        turn = "computer";
        change = "no";

        if(lastcard === "wc"){
        lastcard = this.id + "x";
            down.style.visibility = "hidden";
            up.style.visibility = "visible";
        computerturn();
        }
        else{
            turn = "player";
            lastcard = this.id + "x";
            Array.from(document.getElementsByClassName("square")).forEach(function(b) {
                b.style.visibility = "hidden";
            });
            document.getElementById(this.id).style.visibility = "visible";
        }
    }

}
function computerchangecolor(){
    updatecomputerhand();
    lastcard = compmostcolor + "x";
}

// Update Hand Functions

function updatecomputerhand(){
    document.getElementById("counter").innerHTML = " (" + compdeck.length + ")";
    let r = y = b = g = 0;
    for(let i = 1; i < compdeck.length+1; i++){
        switch(compdeck[i-1][0]){
            case 'r': r++; break;
            case 'y': y++; break;
            case 'b': b++; break;
            case 'g': g++; break;
        }
            if(i < 8){
                document.getElementById("cs" + i).style.visibility = "visible";
            }
    }

    let max = r;
    compmostcolor = "r";
    if(max < y){
        max = y
        compmostcolor = "y";
    }
    if(max < b){
        max = b;
        compmostcolor = "b";
    }
    if(max < g){
        max = g;
        compmostcolor = "g";
    }
}
function updateplayerhand(){
    for(let i = 1; i < playerdeck.length+1; i++){
        if(i < 8){
            document.getElementById("ps" + i).setAttribute("src", "Images/" + playerdeck[i -1] + ".png")
            document.getElementById("ps" + i).style.visibility = "visible";
        }
    }

    document.getElementById("-1").style.visibility = "hidden";
    if(playerdeck.length > 7)
        document.getElementById("1").style.visibility = "visible";
    else
        document.getElementById("1").style.visibility = "hidden";
}
function shiftcards(){
    let num = parseInt(this.id);

    if(currentindex + num -1 >= 0 && currentindex + num -1 < playerdeck.length -6){
        currentindex += num;
    }

    for(let i = currentindex; i < currentindex + 7; i++){
        document.getElementById("ps" + (i + 1 -currentindex)).setAttribute("src", "Images/" + playerdeck[i -1] + ".png")
    }
    if(currentindex === playerdeck.length - 6){
        document.getElementById("1").style.visibility = "hidden";
    }
    else{
        document.getElementById("1").style.visibility = "visible";
    }
    if(currentindex === 1){
        document.getElementById("-1").style.visibility = "hidden";
    }
    else{
        document.getElementById("-1").style.visibility = "visible";
    }
}

// Sorting Functions
function sortbybox(){

    let c = this.id[1];
    let newdeck = [];

    if(this.id === "playable"){
        if(turn !== "player"){
            return;
        }
        sortbyplayable();
    }
    else if(c === 't'){
        for(let i = 0; i < playerdeck.length; i++){
            if(playerdeck[i] === "w4"){
                newdeck.push(playerdeck[i]);
            }
        }
        for(let i = 0; i < playerdeck.length; i++){
            if(playerdeck[i] === "wc"){
                newdeck.push(playerdeck[i]);
            }
        }
        for(let i = 0; i < playerdeck.length; i++){
            if(playerdeck[i][1] === 'r'){
                newdeck.push(playerdeck[i]);
            }
        }
        for(let i = 0; i < playerdeck.length; i++){
            if(playerdeck[i][1] === 's'){
                newdeck.push(playerdeck[i]);
            }
        }
        for(let i = 0; i < playerdeck.length; i++){
            if(playerdeck[i] !== "w4" && playerdeck[i] !== "wc" &&  playerdeck[i][1] !== 'r' &&  playerdeck[i][1] !== 's' &&  playerdeck[i][1] !== '+'){
                newdeck.push(playerdeck[i]);
            }
        }
        playerdeck = newdeck;
        updateplayerhand();
        }
        else {

        for (let i = 0; i < playerdeck.length; i++) {
            if (playerdeck[i][0] === c) {
                newdeck.push(playerdeck[i]);
            }
        }
        for (let i = 0; i < playerdeck.length; i++) {
            if (playerdeck[i][0] !== c) {
                newdeck.push(playerdeck[i]);
            }
        }
        playerdeck = newdeck;
        updateplayerhand();

    }

}
function sortbyplayable(){
    if(sorted === true)
        return;

    sorted = true;
    let count = 0;
    let newdeck = [];
    for(let i = 0; i < playerdeck.length; i++) {
        if (playerdeck[i][1] === lastcard[1]) {
            newdeck.push(playerdeck[i]);

            count++;

        }
    }
    for(let i = 0; i < playerdeck.length; i++) {
        if (playerdeck[i][0] === lastcard[0] && playerdeck[i][1] !== lastcard[1]) {
            newdeck.push(playerdeck[i]);

            count++;
        }
    }
    let wild = contains(playerdeck, lastcard[0], 0);
    let wild2 = contains(playerdeck, lastcard[1], 1);
    for(let i = 0; i < playerdeck.length; i++) {
        if (playerdeck[i] === "wc" || (playerdeck[i] === "w4" && !wild && !wild2)){
            newdeck.push(playerdeck[i]);

            count++;
        }
    }
    for (let i = 0; i < playerdeck.length; i++) {

           if(playerdeck[i][0] !== lastcard[0] && playerdeck[i][1] !== lastcard[1] && playerdeck[i] !== "wc" && (playerdeck[i] !== "w4" || wild || wild2)){
            newdeck.push(playerdeck[i]);

           }
    }
    playerdeck = newdeck;
    updateplayerhand();

    if(count > 7)
        count = 7;

    if(count > 0){
    Array.from(document.getElementsByClassName("minisquare")).forEach(function(a){
        a.style.display = "none";
    });
    document.getElementById("break").style.display = "none";
    if(Interval === 0){
Interval = window.setInterval(function() {
    for(let i = 0; i < count; i++){
        let arrow = document.getElementById("arrow" + (i+1));
        if(arrow.style.visibility === "hidden")
        arrow.style.visibility = "visible";
        else
            arrow.style.visibility = "hidden";
    }
}, 600);}
    }
    else{
        flashleftarrow();
    }
}
function flashleftarrow(){
    if(Interval === 0){
        Interval = window.setInterval(function() {
            let left = document.getElementById("left");
                if(left.style.visibility === "hidden"){
                    left.style.visibility = "visible";}
                else
                    left.style.visibility = "hidden";
        }, 600);}
}
function endgame(){
    while(deck.length !== 0){
        deck.pop();
    }
    while(playerdeck.length !== 0){
        playerdeck.pop();
    }
    while(compdeck.length !== 0){
        compdeck.pop();
    }
    while(reshufflepile.length !== 0){
        reshufflepile.pop();
    }
    window.setTimeout( function(){
    document.getElementById("startgame").style.display = "inline";
        for(let i = 1; i < 8; i++){
            document.getElementById("ps" + i).style.visibility = "hidden";
        }
        for(let i = 1; i < 8; i++){
            document.getElementById("cs" + i).style.visibility = "hidden";
        }
        document.getElementById("Deck").style.visibility = "hidden";
        document.getElementById("up").style.visibility = "hidden";
        document.getElementById("down").style.visibility = "hidden";
        Array.from(document.getElementsByClassName("square")).forEach(function(b) {
            b.style.visibility = "hidden";
        });
        Array.from(document.getElementsByClassName("minisquare")).forEach(function(b) {
            b.style.visibility = "hidden";
        });
        document.getElementById("counter").style.visibility = "hidden";
        document.getElementById("lastlay").style.visibility = "hidden";
        document.getElementById("1").style.visibility = "hidden";
        document.getElementById("-1").style.visibility = "hidden";

    } ,4000)

}