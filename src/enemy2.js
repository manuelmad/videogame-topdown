/* Enemigo 2 */
// Caminar hacia la derecha
const frame1_2 = new Image();
frame1_2.src = './assets/imgs/blue-alien/walk-right/blue__0006_walk_1.png';

const frame2_2 = new Image();
frame2_2.src = './assets/imgs/blue-alien/walk-right/blue__0007_walk_2.png';

const frame3_2 = new Image();
frame3_2.src = './assets/imgs/blue-alien/walk-right/blue__0008_walk_3.png';

const frame4_2 = new Image();
frame4_2.src = './assets/imgs/blue-alien/walk-right/blue__0009_walk_4.png';

const frame5_2 = new Image();
frame5_2.src = './assets/imgs/blue-alien/walk-right/blue__0010_walk_5.png';

const frame6_2 = new Image();
frame6_2.src = './assets/imgs/blue-alien/walk-right/blue__0011_walk_6.png';

const framesEnemy2 = [frame1_2, frame2_2, frame3_2, frame4_2, frame5_2, frame6_2];

let animationIndexEnemy2 = 0;

// Posición inicial
let positionXenemy2 = 300;
let positionYenemy2 = 0;
let borderPosition2 = 'down';

// Píxeles que se mueve por cada toque de tecla
const movePixelsenemy2 = 10;


// Función que mueve al enemigo hacia la izquierda
function moveDownEnemy() {
	if(collision) {
		return;
	}
	positionXenemy2 = positionXenemy2;
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	layout();
	shipPart(posXship, posYship);

	if(positionYenemy > 0 && borderPosition2 == 'up') {
		positionYenemy2 = positionYenemy2-movePixelsenemy2;

		animationIndexEnemy2++
		if(animationIndexEnemy2 >= 5) {
			animationIndexEnemy2 = 0
		}
		ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth, enemyHeight);

		// Renderizo también al personaje
		if(movingRight) {
			ctx.drawImage(sprite, framesWalking["right"][animationIndex].x, framesWalking["right"][animationIndex].y, framesWalking["right"][animationIndex].width, framesWalking["right"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
		} else if(movingUp) {
			ctx.drawImage(sprite, framesWalking["up"][animationIndex].x, framesWalking["up"][animationIndex].y, framesWalking["up"][animationIndex].width, framesWalking["up"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
		} else if(movingLeft) {
			ctx.drawImage(sprite, framesWalking["left"][animationIndex].x, framesWalking["left"][animationIndex].y, framesWalking["left"][animationIndex].width, framesWalking["left"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
		} else if(movingDown) {
			ctx.drawImage(sprite, framesWalking["down"][animationIndex].x, framesWalking["down"][animationIndex].y, framesWalking["down"][animationIndex].width, framesWalking["down"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
		} else {
			ctx.drawImage(sprite, framesWalking["down"]["0"].x, framesWalking["down"]["0"].y, framesWalking["down"]["0"].width, framesWalking["down"]["0"].height, positionX, positionY, characterWidth, characterHeight);
		}

		// Renderizo a la bala
		//ctx.drawImage(asteroid, xFixed, positionYenemyBullet, enemyBulletsWidth, enemyBulletsHeight);

		collisionCheck();
	} else {
		borderPosition = 'down';
		moveUpEnemy();
	}
}

// Función que mueve al personaje hacia la derecha
function moveUpEnemy() {
	if(collision) {
		return;
	}
	positionXenemy2 = positionXenemy2;
	// console.log('Ye',positionYenemy);
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	layout();
	shipPart(posXship, posYship);

	if(positionYenemy < 300 - enemyWidth && borderPosition == 'down') {
		positionYenemy2 = positionYenemy2+movePixelsenemy2;

		animationIndexEnemy2++
		if(animationIndexEnemy2 >= 5) {
			animationIndexEnemy2 = 0
		}
		ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth, enemyHeight);

		// Renderizo también al personaje
		if(movingRight) {
			ctx.drawImage(sprite, framesWalking["right"][animationIndex].x, framesWalking["right"][animationIndex].y, framesWalking["right"][animationIndex].width, framesWalking["right"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
		} else if(movingUp) {
			ctx.drawImage(sprite, framesWalking["up"][animationIndex].x, framesWalking["up"][animationIndex].y, framesWalking["up"][animationIndex].width, framesWalking["up"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
		} else if(movingLeft) {
			ctx.drawImage(sprite, framesWalking["left"][animationIndex].x, framesWalking["left"][animationIndex].y, framesWalking["left"][animationIndex].width, framesWalking["left"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
		} else if(movingDown) {
			ctx.drawImage(sprite, framesWalking["down"][animationIndex].x, framesWalking["down"][animationIndex].y, framesWalking["down"][animationIndex].width, framesWalking["down"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
		} else {
			ctx.drawImage(sprite, framesWalking["down"]["0"].x, framesWalking["down"]["0"].y, framesWalking["down"]["0"].width, framesWalking["down"]["0"].height, positionX, positionY, characterWidth, characterHeight);
		}

		// Renderizo a la bala
		// ctx.drawImage(asteroid, xFixed, positionYenemyBullet, enemyBulletsWidth, enemyBulletsHeight);

		collisionCheck();
	} else {
		borderPosition = 'up';
		moveDownEnemy();
	}
}