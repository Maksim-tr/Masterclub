// Самый тупой код, особенно с айди каждой клетки

// Зато человеком написан) 

// Зато работает) 

let oVictories = 0;
let xVictories = 0;
let allowAlerts = true;
let autogame = false;
let NewGame = document.querySelector('.newGame');
let type = "Игра на двоих";
let board = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    const cells = document.querySelectorAll('.cell')
let currentPlayer = "o"


oVictories = Number(localStorage.getItem('o'));
xVictories = Number(localStorage.getItem('x'));

result.innerHTML = xVictories + ":" + oVictories

cells.forEach(function(cell) {
cell.addEventListener('click', abc)
});



function abc() {
let draw = false;
let win = false;
if(this.innerHTML != "x" && this.innerHTML != "o") {
currentPlayer == "o" ? currentPlayer = "x" : currentPlayer = "o"
this.innerHTML = currentPlayer;
this.classList.remove('empty');

let thisNumber = Number(this.getAttribute('id').replace('cell', '')) - 1;

board[thisNumber] = currentPlayer;

let emptyCells = document.querySelectorAll('.empty');

checkWin();

function checkWin() {
if(board[0] == board[1] && board[1] == board[2] || board[3] == board[4] && board[4] == board[5] || board[6] == board[7] && board[7] == board[8] || board[0] == board[4] && board[4] == board[8] || board[2] == board[4] && board[4] == board[6] || board[0] == board[3] && board[3] == board[6] || board[1] == board[4] && board[4] == board[7] || board[2] == board[5] && board[5] == board[8]) {

if(allowAlerts) {
alert(currentPlayer.toUpperCase() + " победил!");
}
cells.forEach(function(cell) { cell.removeEventListener('click', abc) });
win = true;

currentPlayer == "o" ? oVictories++ : xVictories++;

result.innerHTML = xVictories + ":" + oVictories;

localStorage.setItem('o', oVictories.toString());
localStorage.setItem('x', xVictories.toString());

if(autogame) {
allowAlerts = false;
newGame();
Alerts();
}
}
}


let notEmptyCells = 0;
board.forEach(function(cell) { 
if(cell == "x" || cell == "o") {
notEmptyCells++;
}
else {
notEmptyCells = 0;
}
});
if(notEmptyCells == 9 && !win) { xVictories += 0.5;
oVictories += 0.5;
result.innerHTML = xVictories + ":" + oVictories;

localStorage.setItem('o', oVictories.toString());
localStorage.setItem('x', xVictories.toString());

draw = true;
if(allowAlerts) { alert("Ничья"); } if(autogame) { allowAlerts = false; newGame(); Alerts() } }


switch(type) {
case "С ботом":
if(!win && !draw && emptyCells.length < 9) {
currentPlayer == "o" ? currentPlayer = "x" : currentPlayer = "o";
if(cell5.innerHTML === "") {
board[4] = currentPlayer;
cell5.innerHTML = currentPlayer;
cell5.classList.remove('empty');
}
else if(cell1.innerHTML === "" || cell3.innerHTML === "" || cell7.innerHTML === "" || cell9.innerHTML === "") {
let corners = [cell1, cell3, cell7, cell9].filter(corner => corner.innerHTML === "");
let curCorner = corners[Math.floor(Math.random() * corners.length)];
curCorner.innerHTML = currentPlayer;
curCorner.classList.remove('empty');
board[Number(curCorner.getAttribute('id').replace('cell', ''))-1] = currentPlayer;
}
else {
let Random = Math.floor(Math.random() * emptyCells.length);

let index = Number(emptyCells[Random].getAttribute('id').replace('cell', ''))-1;
board[index] = currentPlayer;

emptyCells[Random].innerHTML = currentPlayer;
emptyCells[Random].classList.remove('empty');
}
checkWin();
}
break;
}
}
}






function newGame() {
if(allowAlerts) {
let confirmation = confirm("Вы уверены?");
if(confirmation) {
board = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
currentPlayer = "o";
cells.forEach(function(cell) { cell.innerHTML = ""; cell.addEventListener('click', abc); cell.classList.add('empty') });
}
}
else {
board = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
currentPlayer = "o";
cells.forEach(function(cell) { cell.innerHTML = ""; cell.addEventListener('click', abc); cell.classList.add('empty'); });
}
}


function changeBoardSize() {
document.querySelector('.game').style.width = boardSize.value * 3 + 6 + "px";
cells.forEach(function(cell) {
cell.style.cssText += "width:" + boardSize.value + "px; height:" + boardSize.value + "px; font-size:" + boardSize.value / 1.25 + "px";
});
}
function Alerts() {
if(alerts.checked) {
allowAlerts = true
} 
else {
allowAlerts = false
}
}
function autoNewGame() {
if(autoGame.checked) {
autogame = true;
}
else {
autogame = false
}
}
function selection() {
board = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
currentPlayer = "o";
cells.forEach(cell => { cell.innerHTML = "" });
switch(document.querySelector('.type').value) {
case "С ботом":
type = "С ботом";
cells.forEach(function(cell) { cell.removeEventListener('click', editorMode); cell.addEventListener('click', abc); });
plo.style.display = "none";
plx.style.display = "none";
del.style.display = "none";
break;
case "Игра на двоих":
type = "Игра на двоих";
cells.forEach(function(cell) { cell.removeEventListener('click', editorMode); cell.addEventListener('click', abc); });
plo.style.display = "none";
plx.style.display = "none";
del.style.display = "none";
break;
case "Редактор":
type = "Редактор";
cells.forEach(function(cell) { cell.removeEventListener('click', abc); cell.addEventListener('click', editorMode); });
plo.style.display = "inline-block";
plx.style.display = "inline-block";
del.style.display = "inline-block";
break;
}
}
function changeTheme() {
document.body.style.background = theme.value;
document.querySelector('.game').style.background = theme.value
}
function changeCellColor() {
cells.forEach(function(cell) {
cell.style.background = cellColor.value
});
plo.style.background = cellColor.value;
plx.style.background = cellColor.value;
del.style.background = cellColor.value;
}
function changeSymbolsColor() {
cells.forEach(function(cell) {
cell.style.color = symbolsColor.value
});
plo.style.color = symbolsColor.value;
plx.style.color = symbolsColor.value;
del.style.color = symbolsColor.value;
}

let curPlayer = "x";

function editorMode() {
if(this.innerHTML != curPlayer) {
 this.innerHTML = curPlayer;
}
else {
this.innerHTML = "";
}
}

plo.onclick = () => {
curPlayer = "o";
}
plx.onclick = () => {
curPlayer = "x";
}
del.onclick = () => {
curPlayer = "";
}
function res() {
let resetConfirm = confirm("Вы уверены?");
if(resetConfirm) {
xVictories = 0;
oVictories = 0;
result.innerHTML = "0:0";
}
}
