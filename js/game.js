var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var player = new Image();
var enemy = new Image();
var bullet = new Image();
var heart = new Image();
var damage = new Image();
var fuel = new Image();

player.src = `../images/${character}.png`;
enemy.src = "../images/enemyplane.png";
bullet.src = "../images/fire.png";
heart.src = "../images/heart.png";
damage.src = "../images/damage.png";
fuel.src = "../images/fuel.png";

var gameAudio = new Audio('../sounds/war.mp3');
var hitAudio = new Audio('../sounds/hit.wav');











var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var supplyFuel = false;
var alive = true;
var isNight = false;
var isDay = true;
var masterMode = false;





document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e) {

	if (e.keyCode == 65) {
		leftPressed = true;
	}
	if (e.keyCode == 68) {
		rightPressed = true;
	}
	if (e.keyCode == 83) {
		downPressed = true;
	}
	if (e.keyCode == 87) {
		upPressed = true;
	}
}


document.addEventListener("keyup", keyUpHandler);

function keyUpHandler(e) {

	if (e.keyCode == 65) {
		leftPressed = false;
	}
	if (e.keyCode == 68) {
		rightPressed = false;
	}
	if (e.keyCode == 83) {
		downPressed = false;
	}
	if (e.keyCode == 87) {
		upPressed = false;
	}
}


function moveLeft() {

	if (playerX > 0) {
		playerX -= 4;
	}
}

function moveRight() {
	if (playerX < canvas.width - player.width) {
		playerX += 6;
	}
}
function moveUp() {
	if (playerY > 0 && character != 'tank') {
		playerY -= 5;
	}
}

function moveDown() {
	if (playerY < canvas.height / 2 && character != 'tank') {
		playerY += 5;
	}
}

enemies[0] = {
	x: cvs.width,
	y: 0,
	live: enemiesLive,
	shoot: 0,
	type: 'plane'
};


function reLoad(event) {
if(event.code=="Space"){
	location.reload();
}
}
 function playAudio()
 {
	gameAudio.play();
 }

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
function playerHit(bullet) {
	if (bullet) {
		if (bullet.x >= playerX + 20 && bullet.x < playerX + player.width - 10
			&& bullet.y >= playerY + 10 && bullet.y < playerY + player.height - 10) {
			stamina -= 10;
			if (stamina <= 0) {
				live--;
				stamina = 100;
			}
			return true;
		}
	}
}


function enemyHit(bullet) {
	if (bullet) {
		for (i = 0; i < enemies.length; i++) {

			if (bullet.x >= enemies[i].x + 20 && bullet.x < enemies[i].x + enemy.width - 10
				&& bullet.y >= enemies[i].y + 10 && bullet.y < enemies[i].y + enemy.height - 10) {
				if (enemies[i].live <= 1) {
					enemies.splice(i, 1);
					score += 50;
				}
				else {
					enemies[i].live--;
					score += 10;
				}
				return true;
			}
		}

	}
}