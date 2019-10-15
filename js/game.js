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

//score interval
setInterval(() => {
	if (alive) {
		score += 1;
	}
}, 150);

function Bullet() {
	this.x;
	this.y;
	this.xDelta = 0;
	this.yDelta = 0;

	this.xTarget;
	this.yTarget;
	this.draw = function (isEnemy) {
			bullet.src = isEnemy ?  "../images/enemyfire.png"  : "../images/fire.png" ;
		ctx.drawImage(bullet, this.x, this.y);
	};
}

Bullet.prototype.setCoordinates = function (x, y, xTarget, yTarget) {
	this.x = x;
	this.y = y;
	this.xTarget = xTarget;
	this.yTarget = yTarget;
}


Bullet.prototype.setDeltas = function () {
	var diffY = this.y - this.yTarget;
	var diffX = this.x - this.xTarget;
	var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
	this.xDelta = (12 * diffX) / distance;
	this.yDelta = (12 * diffY) / distance;
};

Bullet.prototype.moveBullet = function () {
	this.x -= this.xDelta;
	this.y -= this.yDelta;
};

Bullet.prototype.wallCollision = function (bullet) {
	if (bullet.x > canvas.width || bullet.x < 0) {
		return true;
	}
	if (bullet.y > canvas.height || bullet.y < 0) {
		return true;
	}
	else return false;
};


function fireBullet() {
	var newBullet = new Bullet();
	newBullet.setCoordinates(playerX + 100, playerY + 50, xCoo - ((screen.width - 1500) / 2) - 10, yCoo - 20)
	newBullet.setDeltas();
	liveBullets.push(newBullet);
};
var xCoo;
var yCoo;

canvas.addEventListener('click', function (event) {
	xCoo = event.clientX;
	yCoo = event.clientY;
	fireBullet();
}, false);

function makeEnemyGenerateInterval() {
	enemyGenerateInterval = setInterval(() => {
		enemies.push({
			x: cvs.width,
			y: Math.floor(Math.random() * 550),
			live: enemiesLive,
			shoot: 0,
			type: 'plane'
		});
	}, enemyGenerateTime);
}

function makeEnemyBulletsGenerateInterval() {
	enemiesBulletsGenerateInterval = setInterval(() => {
		for (i = 0; i < enemies.length; i++) {
			if (enemies[i].shoot == 0) {
				enemies[i].shoot = 3;
				var enemyBullet = new Bullet();
				enemyBullet.setCoordinates(enemies[i].x + 50, enemies[i].y + 50,
					playerX + Math.random() * player.width + 50,
					playerY + Math.random() * player.height + 50);

				enemyBullet.setDeltas();
				enemiesBullets.push(enemyBullet);
			}
			else {
				enemies[i].shoot--;
			}
		}
	}, bulletGenerateTime);
}


//stamina drain interval
staminaDrainInterval = setInterval(() => {
	stamina -= 1;
	if (stamina == 0) {
		live--;
		stamina = 100;
	}

}, 1000);


//fuel supply interval
setInterval(() => {
	fuelX = Math.random() * 1400 + 20;
	fuelY = character == 'tank' ? 730 : Math.random() * 200 + 20;
	supplyFuel = true;
	setTimeout(function () {

		supplyFuel = false;

	}, 5000);

}, 25000);

//night effect interval
function makeNightInterval() {
	nightInterval = setInterval(() => {

		isNight = true;
		isDay = false;
		clearInterval(nightInterval);

	}, 30000);
}
makeNightInterval();
makeEnemyGenerateInterval();
makeEnemyBulletsGenerateInterval();
