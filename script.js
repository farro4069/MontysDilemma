const instructions = document.querySelector('.instructions');
const theDoors = document.querySelector('.door__items');
const scorePanel = document.querySelector('.score__panel');
const switched = scorePanel.querySelector('.switched');
const stayed = scorePanel.querySelector('.stayed');

let stayGames = 0;
let switchGames = 0; 
let stayWin = 0;
let switchWin = 0;
let stayWinRate = 0;
let switchWinRate = 0;

let winningDoorNum = 0;

setUp();

function pickTheDoor(e) {
	instructions.style.opacity = 0;
	this.childNodes[0].dataset.tick = 'true';
	pickedDoor = this.childNodes[1];
	pickedDoorNum = pickedDoor.textContent;
	const waitForGoat = setTimeout(revealAGoat, 500);
}

function revealAGoat(){
	let possibleDoors = [];
	allDoors.forEach(p => {
		if (p.childNodes[1] == pickedDoor) {
			return
		} else {
			if (p.childNodes[1].textContent == winningDoorNum + 1) {
				return
			} else {
				possibleDoors.push(p)
			}
		}
	})

	revealDoorNum = Math.floor(Math.random() * possibleDoors.length)
	revealDoor = possibleDoors[revealDoorNum];
	revealDoor.style.backgroundImage = "url('images/door_open.png')";
	revealDoor.style.cursor = 'not-allowed';
	revealDoor.childNodes[2].style.opacity = 1;
	allDoors.forEach(door => doorElement = door.removeEventListener('click', pickTheDoor, {once: true}))
	allDoors.forEach(door => {
		door.addEventListener('click', stayOrSwitch, {once: true});
	})
	instructions.innerHTML = "<p>Let's improve the odds. <br>Will you stay or switch? Click for your prize.</p>"
	instructions.style.opacity = 1;
}

function openDoor() {
	// make sure its not the open door
	// move the tick and add 1 to switch
	// wait a sec
	// open the door
	// reveal the prize
	// update the score
	// show the score
}

function stayOrSwitch(e) {
	if (this.childNodes[0].dataset.tick == 'true') {
		this.childNodes[0].dataset.winner == 'true'? stayWin ++: null; 
		stayGames ++; 
	} else {
		this.childNodes[0].dataset.tick = 'true';
		this.childNodes[0].dataset.winner == 'true'? switchWin ++: null; 
		switchGames ++;
	}
	this.style.backgroundImage = "url('images/door_open.png')";
	this.childNodes[2].style.opacity = 1;

	instructions.innerHTML = '<p>Play again</p>';
	instructions.addEventListener('click', playAgain);
	updateScore();
}

function updateScore() {
	if (switchGames != 0) {switchWinRate = Math.floor(switchWin / switchGames * 100)}
	if (stayGames != 0) {stayWinRate = Math.floor(stayWin / stayGames * 100)}
	switched.innerHTML = `<p>Switch</p><p>${switchGames}</p><p>${switchWinRate}%</p>`
	switched.style.setProperty('--winRate', switchWinRate + '%');
	stayed.innerHTML = `<p>Stay</p><p>${stayGames}</p><p>${stayWinRate}%</p>`
	stayed.style.setProperty('--winRate', stayWinRate + '%');
	// show the score	
}


function setUp() {
	winningDoorNum = Math.floor(Math.random() * 3)
	let pickedDoor = "";
	let doorsElement = '';
	for (i = 1; i <= 3; i++) {
		if (i == winningDoorNum + 1) {
			doorsElement += `<li class="door__item"><p data-winner='true'>&#10004;</p><p class="door-number">${i}</p><img src="images/car.png"></li>`;
		} else {
			doorsElement += `<li class="door__item"><p>&#10004;</p><p class="door-number">${i}</p><img src="images/goat.png"></li>`
		}
	}
	theDoors.innerHTML = doorsElement;
	allDoors = theDoors.querySelectorAll('.door__item');
	allDoors.forEach(door => doorElement = door.addEventListener('click', pickTheDoor, {once: false}));
	instructions.innerHTML = `<p>You have a one in three chance.<br>Which door hides a new car?</p>`;
}

function playAgain() {
	setUp()
}

