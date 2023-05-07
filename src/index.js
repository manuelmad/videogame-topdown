let level = 0;
let sublevel = 0;

const level_p = document.getElementById('level');
// level_p.innerHTML = sublevel+1;

const ship_part_container = document.getElementById('ship_parts');
const part1 = document.createElement('img');
part1.src = '../assets/imgs/ship1/parts/ship1_body.png';
// ship_part_container.appendChild(part1);


/* configuración del canvas */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// Dimensiones del heroe sobre el canvas
let characterWidth;
let characterHeight;

// Dimensiones del enemigo sobre el canvas
let enemyWidth;
let enemyHeight;

// Dimensiones de las partes de naves sobre el canvas
let shipWidth;
let shipHeight;

// Tamaño de canvas responsivo
let tamano_ventana = window.innerWidth;
console.log(tamano_ventana, window.innerHeight);
if(tamano_ventana < 700) {
	canvas.setAttribute("width", 300);
	canvas.setAttribute("height", 300);

	characterWidth = 30;
	characterHeight = 45;

	enemyWidth = 21;
	enemyHeight = 31;

	shipWidth = (ships[level].parts[sublevel].width)*0.8;
	shipHeight = (ships[level].parts[sublevel].height)*0.8;
}
else if(tamano_ventana >= 700 && tamano_ventana < 1024) {
	canvas.setAttribute("width", 500);
	canvas.setAttribute("height", 500);

	characterWidth = 50;
	characterHeight = 75;

	enemyWidth = 35;
	enemyHeight = 53;

	shipWidth = ships[level].parts[sublevel].width;
	shipHeight = ships[level].parts[sublevel].height;
}
else if(tamano_ventana >= 1024) {
	canvas.setAttribute("width", 700);
	canvas.setAttribute("height", 700);

	characterWidth = 45;
	characterHeight = 68;

	enemyWidth = 35;
	enemyHeight = 53;

	shipWidth = (ships[level].parts[sublevel].width)*1.1;
	shipHeight = (ships[level].parts[sublevel].height)*1.1;
}

// Dimensiones del canvas en variables
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

/* Límites externos del canvas */
const borders = {
	left_border: {
		xinicial: 0,
		yinicial: 0,
		xfinal: 0,
		yfinal: canvasHeight
	},
	right_border: {
		xinicial: canvasWidth,
		yinicial: 0,
		xfinal: canvasWidth,
		yfinal: canvasHeight
	},
	upper_border: {
		xinicial: 0,
		yinicial: 0,
		xfinal: canvasWidth,
		yfinal: 0
	},
	lower_border: {
		xinicial: 0,
		yinicial: canvasHeight,
		xfinal: canvasWidth,
		yfinal: canvasHeight
	}
};


/* Backgound */

const renderBackground = (tileType, backgroundIndex, posX, posY, width, height) => {
	const tileType_ = tileType;
	const backgroundTile = tileType_[backgroundIndex];
	const bkgdX = posX;
	const bkgdY = posY;
	ctx.drawImage(background, backgroundTile.x, backgroundTile.y, backgroundTile.width, backgroundTile.height, bkgdX, bkgdY, width, height);
}

const renderWalls = (tileType, backgroundIndex, posX, posY, width, height) => {
	const tileType_ = tileType;
	const walls3Dtiles = tileType_[backgroundIndex];
	const bkgdX = posX;
	const bkgdY = posY;
	ctx.drawImage(walls3D, walls3Dtiles.x, walls3Dtiles.y, walls3Dtiles.width, walls3Dtiles.height, bkgdX, bkgdY, width, height);
}

const renderWallsBrick = (tileType, backgroundIndex, posX, posY, width, height) => {
	const tileType_ = tileType;
	const wallsBrickTiles = tileType_[backgroundIndex];
	const bkgdX = posX;
	const bkgdY = posY;
	ctx.drawImage(wallsBrick, wallsBrickTiles.x, wallsBrickTiles.y, wallsBrickTiles.width, wallsBrickTiles.height, bkgdX, bkgdY, width, height);
}

/* CÁPSULA */
let xCapsule;
let yCapsule;
let widthCapsule;
let heightCapsule;

const renderCapsule = (tileType, capsuleIndex, posX, posY, width, height) => {
	const tileType_ = tileType;
	const backgroundTile = tileType_[capsuleIndex];
	const bkgdX = posX;
	const bkgdY = posY;
	ctx.drawImage(capsule, backgroundTile.x, backgroundTile.y, backgroundTile.width, backgroundTile.height, bkgdX, bkgdY, width, height);
}

/* CAÑÓN */
let xCannon;
let yCannon;
let widthCannon;
let heightCannon;

const renderCannon = (tileType, cannonIndex, posX, posY, width, height) => {
	const tileType_ = tileType;
	const backgroundTile = tileType_[cannonIndex];
	const bkgdX = posX;
	const bkgdY = posY;
	ctx.drawImage(cannon, backgroundTile.x, backgroundTile.y, backgroundTile.width, backgroundTile.height, bkgdX, bkgdY, width, height);
}

/* BOTÓN */
let xButton;
let yButton;
let widthButton;
let heightButton;

const renderButton = (tileType, buttonIndex, posX, posY, width, height) => {
	const tileType_ = tileType;
	const backgroundTile = tileType_[buttonIndex];
	const bkgdX = posX;
	const bkgdY = posY;
	ctx.drawImage(button, backgroundTile.x, backgroundTile.y, backgroundTile.width, backgroundTile.height, bkgdX, bkgdY, width, height);
}


/* MAPA */
// const map = (tileType, rockIndex, posX, posY, width, height) => {
// 	const tileType_ = tileType;
// 	const rockTile = tileType_[rockIndex];
// 	const rockX = posX;
// 	const rockY = posY;
// 	ctx.drawImage(tiles, rockTile.x, rockTile.y, rockTile.width, rockTile.height, rockX, rockY, width, height);
// };

const layout = () => {
	// Suelo marrón cubre todo el canvas
	for(let i = 0; i <= canvasHeight; i=i+20) {
		renderBackground(backgroundTiles, 0, 0, i, 20, 20);
		for(let j = 0; j <= canvasWidth; j=j+20) {
			renderBackground(backgroundTiles, 0, j, i, 20, 20);
		}
	}

	// Marcas de arena
	renderBackground(backgroundTiles, 1, canvasWidth/2, canvasHeight/5, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/3, canvasHeight/3, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/5, canvasHeight/15, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/13, canvasHeight/5, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/1.1, canvasHeight/1.5, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/7, canvasHeight/1.3, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/2, canvasHeight/1.1, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/1.5, canvasHeight/2, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/4, canvasHeight/1.7, 30, 30);

	// Rocas grises
	renderBackground(backgroundTiles, 2, canvasWidth/5, canvasHeight/4, 30, 30);
	renderBackground(backgroundTiles, 2, canvasWidth/1.7, canvasHeight/1.5, 30, 30);
	renderBackground(backgroundTiles, 2, canvasWidth/1.2, canvasHeight/7, 30, 30);
	renderBackground(backgroundTiles, 2, canvasWidth/1.1, canvasHeight/1.2, 30, 30);
	renderBackground(backgroundTiles, 2, canvasWidth/30, canvasHeight/1.7, 30, 30);

	/* Paredes */
	// Horizontales
	renderWalls(walls3Dtiles, 5, 0, 307, 32, 32);
	for(let i = 32; i <= canvasWidth-108; i=i+32) {
		renderWalls(walls3Dtiles, 3, i, 307, 32, 32);
	}
	renderWalls(walls3Dtiles, 4, 592, 307, 32, 32);

	renderWalls(walls3Dtiles, 5, 361, 145, 32, 32);
	for(let i = 377; i <= canvasWidth-108; i=i+32) {
		renderWalls(walls3Dtiles, 3, i, 145, 32, 32);
	}
	renderWalls(walls3Dtiles, 4, canvasWidth-108, 145, 32, 32);

	renderWalls(walls3Dtiles, 5, 84, 145, 32, 32);
	for(let i = 100; i <= 240; i=i+32) {
		renderWalls(walls3Dtiles, 3, i, 145, 32, 32);
	}
	renderWalls(walls3Dtiles, 4, 240, 145, 32, 32);


	// Verticales
	renderWalls(walls3Dtiles, 2, 70, 416, 32, 32);
	for(let i = 430; i <= canvasHeight-32; i=i+32) {
		renderWalls(walls3Dtiles, 1, 70, i, 32, 32);
	}
	renderWalls(walls3Dtiles, 0, 70, canvasHeight-32, 32, 32);


	for(let i = 330; i <= canvasHeight-100; i=i+32) {
		renderWalls(walls3Dtiles, 1, 170, i, 32, 32);
	}
	renderWalls(walls3Dtiles, 0, 170, canvasHeight-100, 32, 32);

	renderWalls(walls3Dtiles, 2, 270, 398, 32, 32);
	for(let i = 430; i <= 490; i=i+32) {
		renderWalls(walls3Dtiles, 1, 270, i, 32, 32);
	}
	renderWalls(walls3Dtiles, 0, 270, 490, 32, 32);

	renderWalls(walls3Dtiles, 2, 270, 570, 32, 32);
	for(let i = 602; i <= canvasHeight-32; i=i+32) {
		renderWalls(walls3Dtiles, 1, 270, i, 32, 32);
	}
	renderWalls(walls3Dtiles, 0, 270, canvasHeight-32, 32, 32);


	for(let i = 330; i <= canvasHeight-100; i=i+32) {
		renderWalls(walls3Dtiles, 1, 370, i, 32, 32);
	}
	renderWalls(walls3Dtiles, 0, 370, canvasHeight-100, 32, 32);

	// Cápsula
	xCapsule = canvasWidth-65;
	yCapsule = 10;
	widthCapsule = 55;
	heightCapsule = 106;
	renderCapsule(capsuleSprites, 0, xCapsule, yCapsule, widthCapsule, heightCapsule);
}

// Array con la información de todas las paredes del nivel 1 para la colisión del personaje
const walls = [
	wall_h1 = {
		x: 0,
		y: 307,
		width: 624,
		height: 32
	},
	wall_h2 = {
		x: 361,
		y: 145,
		width: 263,
		height: 32
	},
	wall_h3 = {
		x: 84,
		y: 145,
		width: 188,
		height: 32
	},
	wall_v1 = {
		x: 70,
		y: 416,
		width: 32,
		height: 284
	},
	wall_v2 = {
		x: 170,
		y: 330,
		width: 32,
		height: 302
	},
	wall_v3 = {
		x: 270,
		y: 398,
		width: 32,
		height: 124
	},
	wall_v4 = {
		x: 270,
		y: 570,
		width: 32,
		height: 130
	},
	wall_v5 = {
		x: 370,
		y: 330,
		width: 32,
		height: 302
	}
];


/* NAVE */
let posXship = 30;
let posYship = 60;

let partTaken = false;

const shipPart = (posX, posY) => {
	const ship = new Image();
	ship.src = ships[level].parts[sublevel].url;
	// shipWidth = ships[level].parts[sublevel].width;
	// shipHeight = ships[level].parts[sublevel].height;
	const shipX = posX;
	const shipY = posY;
	if(!partTaken) {
		ctx.drawImage(ship, shipX, shipY, shipWidth, shipHeight);
	}
};



// Función para desaparecer la parte de la nave cuando el personaje la toca
const audio_part = new Audio("./assets/effects/PowerUp.wav");

function shipPartDisappear() {
	if((positionX+characterWidth/2 > posXship && positionX+characterWidth/2 < posXship+shipWidth) && (positionY+characterHeight/2 < posYship + shipHeight && positionY+characterHeight/2 > posYship)) {
		partTaken = true;
		// Condicional para reproducir sonido cuando toma la parte
		if(sublevel == 0 && ship_part_container.innerHTML == "" || sublevel == 1 && ship_part_container.children.length == 1 || sublevel == 2 && ship_part_container.children.length == 2) {
			audio_part.play();
			setTimeout(()=> {
				audio_part.pause();
			}, 2000);
			audio_part.currentTime = 0;

			notifications.innerText = "Has recuperado una pieza de la nave! Puedes pasar al siguiente nivel!";

			setTimeout(()=>{
				notifications.innerText = "";
			}, 4000)
		}
		// Desaparece la parte de la nave porque se renderiza una porción de suelo encima
		if(sublevel == 0) {
			renderBackground(backgroundTiles, 0, posXship, posYship, shipWidth, shipHeight);
		} else if(sublevel == 1) {
			renderBackground(backgroundTiles, 6, posXship, posYship, shipWidth, shipHeight);
		} else if(sublevel == 2) {
			renderBackground(backgroundTiles, 0, posXship, posYship, shipWidth, shipHeight);
		}

		// Aparece la parte tomada en el párrafo correspondiente
		if(sublevel == 0) {
			ship_part_container.appendChild(part1);
		} else if(sublevel == 1) {
			ship_part_container.appendChild(part2);
		} else if(sublevel == 2) {
			ship_part_container.appendChild(part3);
		}
	}
}

// Función para pasar del nivel 1 si se toca la capsula
let level_1_completed = false;

const audio_level_win = new Audio("./assets/effects/level-win.wav");

const audio_not_win_yet = new Audio('../assets/effects/error-or-failed.mp3');

function levelWin() {
	const notifications = document.getElementById('notifications');

	if((positionX+characterWidth/2 > xCapsule+2*widthCapsule/5 && positionX+characterWidth/2 < xCapsule+widthCapsule) && (positionY+characterHeight/2 < yCapsule + heightCapsule && positionY+characterHeight/2 > yCapsule)) {
		if(partTaken) {
			level_1_completed = true;
			sublevel = sublevel+1;

			// Reproducir sonido cuando supera el nivel
			audio_level_win.play();

			audio_background.pause();
			audio_background.currentTime = 0;

			audio_active= false;

			notifications.innerText = "Has superado el nivel!!";

			setTimeout(()=> {
				audio_level_win.pause();
				audio_level_win.currentTime = 0;

				notifications.innerText = "";
				if(sublevel == 1) {
					startLevel2(80, 140, 100);
				} else if(sublevel == 2) {
					framesEnemy = [];
					framesEnemy = [frame1red, frame2red, frame3red, frame4red, frame5red, frame6red];

					framesEnemyLeft = [];
					framesEnemyLeft = [frame1red_left, frame2red_left, frame3red_left, frame4red_left, frame5red_left, frame6red_left];

					framesEnemy2 = [];
					framesEnemy2 = [frame1red, frame2red, frame3red, frame4red, frame5red, frame6red];

					startLevel3(80, 140, 100);
				}
				
			}, 2000);

		} else {
			notifications.innerText = "No has obtenido la parte de la nave necesaria para superar este nivel.";

			audio_not_win_yet.play();
			audio_not_win_yet.volume = 0.3;

			setTimeout(()=> {
				audio_not_win_yet.pause();
				audio_not_win_yet.currentTime = 0;
			}, 2000);

			setTimeout(()=>{
				notifications.innerText = "";
			}, 4000)
		}
	}
}


/* Personaje */

// Hoja de imágenes del heroe
let sprite = new Image();
sprite.src = './assets/imgs/hero/astronauta-transformed.png';

// Variable de indicador de frame
let animationIndex = 0;

// Variable objeto que guarda la ubicación de los frames de cada animación que se encuentra en la hoja de imagen del heroe
const framesWalking = {
	"right": {
		"0": {
			x: 0,
			y: 381,
			width: 127.5,
			height: 190.5
		},
		"1": {
			x: 127.5,
			y: 381,
			width: 127.5,
			height: 190.5
		},
		"2": {
			x: 255,
			y: 381,
			width: 127.5,
			height: 190.5
		},
		"3": {
			x: 382.5,
			y: 381,
			width: 127.5,
			height: 190.5
		}
	},
	"up": {
		"0": {
			x: 0,
			y: 571.5,
			width: 127.5,
			height: 190.5
		},
		"1": {
			x: 127.5,
			y: 571.5,
			width: 127.5,
			height: 190.5
		},
		"2": {
			x: 255,
			y: 571.5,
			width: 127.5,
			height: 190.5
		},
		"3": {
			x: 382.5,
			y: 571.5,
			width: 127.5,
			height: 190.5
		}
	},
	"left": {
		"0": {
			x: 0,
			y: 190.5,
			width: 127.5,
			height: 190.5
		},
		"1": {
			x: 127.5,
			y: 190.5,
			width: 127.5,
			height: 190.5
		},
		"2": {
			x: 255,
			y: 190.5,
			width: 127.5,
			height: 190.5
		},
		"3": {
			x: 382.5,
			y: 190.5,
			width: 127.5,
			height: 190.5
		}
	},
	"down": {
		"0": {
			x: 0,
			y: 0,
			width: 127.5,
			height: 190.5
		},
		"1": {
			x: 127.5,
			y: 0,
			width: 127.5,
			height: 190.5
		},
		"2": {
			x: 255,
			y: 0,
			width: 127.5,
			height: 190.5
		},
		"3": {
			x: 382.5,
			y: 0,
			width: 127.5,
			height: 190.5
		}
	}
}

// Posición inicial del héroe sobre el canvas
let positionX = 0;
let positionY = canvasHeight - characterHeight;

// Píxeles que se mueve el héroe por cada toque de tecla (combinar junto con la función setInterval que ejecuta a moveCharacter)
const movePixels = 15; // 9

// Superficies de colisión del héroe
let characterCollisionsAreas = {
	upper: {
		x: positionX+5,
		y: positionY,
		width: characterWidth-10,
		height: 1
	},
	lower: {
		x: positionX+5,
		y: positionY+characterHeight-1,
		width: characterWidth-10,
		height: 1
	},
	left: {
		x: positionX,
		y: positionY+5,
		width: 1,
		height: characterHeight-10
	},
	right: {
		x: positionX+characterWidth-1,
		y: positionY+5,
		width: 1,
		height: characterHeight-10
	}
}

let collisionUp = false;
let collisionDown = false;
let collisionLeft = false;
let collisionRight = false;

function collisionWalls(levelWalls) {
	levelWalls.forEach(wall => {
		if((wall.x < positionX+10+characterWidth-20) && (wall.x+wall.width)>positionX+10) {
			if(((wall.y+wall.height)>positionY) && (wall.y < (positionY+1))) {
				if(movingUp) {
					collisionUp = true;
					//console.log(collisionUp, collisionDown, collisionLeft,collisionRight);
				}
			}
		}
		if((wall.x < positionX+10+characterWidth-20) && (wall.x+wall.width)>positionX+10) {
			if(((wall.y+wall.height)>positionY+characterHeight-1) && (wall.y < (positionY+characterHeight-1+1))) {
				if(movingDown) {
					collisionDown = true;
					//console.log(collisionUp, collisionDown, collisionLeft,collisionRight);
				}
			}
		}
		if((wall.x < positionX+1) && (wall.x+wall.width)>positionX) {
			if(((wall.y+wall.height)>positionY+10) && (wall.y < (positionY+5+characterHeight-20))) {
				if(movingLeft) {
					collisionLeft = true;
					//console.log(collisionUp, collisionDown, collisionLeft,collisionRight);
				}
			}
		}
		if((wall.x < positionX+characterWidth-1+1) && (wall.x+wall.width)>positionX+characterWidth-1) {
			if(((wall.y+wall.height)>positionY+10) && (wall.y < (positionY+10+characterHeight-20))) {
				if(movingRight) {
					collisionRight = true;
					//console.log(collisionUp, collisionDown, collisionLeft,collisionRight);
				}
			}
		}
	});
}



// Función que mueve al personaje hacia arriba
function moveUp() {
	if(collision || collision2 || level_1_completed || exploded) {
		return;
	}
	positionX = positionX;
	
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	if(sublevel == 0) {
		layout();
	} else if(sublevel == 1) {
		layout2();
	} else if(sublevel == 2) {
		layout3();
	}

	shipPart(posXship, posYship);
	shipPartDisappear();
	levelWin();
	buttonPress();

	if(positionY > borders.upper_border.yinicial) {
		positionY = positionY-movePixels;
		
		animationIndex++;
	}
	ctx.drawImage(sprite, framesWalking["up"][animationIndex].x, framesWalking["up"][animationIndex].y, framesWalking["up"][animationIndex].width, framesWalking["up"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);


	// Renderizo también al enemigo en la posición que tiene
	if(animationIndexEnemy >= 5) {
		animationIndexEnemy = 0
	}
	if(borderPosition == 'left') {
		ctx.drawImage(framesEnemy[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
	} else if(borderPosition == 'right') {
		ctx.drawImage(framesEnemyLeft[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
	}

	// Renderizo también al enemigo 2
	if(animationIndexEnemy2 >= 5) {
		animationIndexEnemy2 = 0
	}
	ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth2, enemyHeight2);

	// Renderizo a la bala
	//ctx.drawImage(asteroid, xFixed, positionYenemyBullet, enemyBulletsWidth, enemyBulletsHeight);

	collisionCheck();
	collisionCheck2();
	explosionsActivator();
}

// Función que mueve al personaje hacia abajo
function moveDown() {
	if(collision || collision2 || level_1_completed || exploded) {
		return;
	}
	positionX = positionX;
	
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	if(sublevel == 0) {
		layout();
	} else if(sublevel == 1) {
		layout2();
	} else if(sublevel == 2) {
		layout3();
	}
	shipPart(posXship, posYship);
	shipPartDisappear();
	levelWin();
	buttonPress();

	if(positionY < borders.lower_border.yfinal - characterHeight) {
		positionY = positionY+movePixels;
		
		animationIndex++;
	}
	ctx.drawImage(sprite, framesWalking["down"][animationIndex].x, framesWalking["down"][animationIndex].y, framesWalking["down"][animationIndex].width, framesWalking["down"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);

	// Renderizo también al enemigo en la posición que tiene
	if(animationIndexEnemy >= 5) {
		animationIndexEnemy = 0
	}
	if(borderPosition == 'left') {
		ctx.drawImage(framesEnemy[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
	} else if(borderPosition == 'right') {
		ctx.drawImage(framesEnemyLeft[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
	}

	// Renderizo también al enemigo 2
	if(animationIndexEnemy2 >= 5) {
		animationIndexEnemy2 = 0
	}
	ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth2, enemyHeight2);

	// Renderizo a la bala
	//ctx.drawImage(asteroid, xFixed, positionYenemyBullet, enemyBulletsWidth, enemyBulletsHeight);

	collisionCheck();
	collisionCheck2();
	explosionsActivator();
}

// Función que mueve al personaje hacia la izquierda
function moveLeft() {
	if(collision || collision2 || level_1_completed || exploded) {
		return;
	}
	positionY = positionY;
	
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	if(sublevel == 0) {
		layout();
	} else if(sublevel == 1) {
		layout2();
	} else if(sublevel == 2) {
		layout3();
	}
	shipPart(posXship, posYship);
	shipPartDisappear();
	levelWin();
	buttonPress();

	if(positionX > borders.left_border.xinicial) {
		positionX = positionX-movePixels;
		
		animationIndex++;
	}
	ctx.drawImage(sprite, framesWalking["left"][animationIndex].x, framesWalking["left"][animationIndex].y, framesWalking["left"][animationIndex].width, framesWalking["left"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);

	// Renderizo también al enemigo en la posición que tiene
	if(animationIndexEnemy >= 5) {
		animationIndexEnemy = 0
	}
	if(borderPosition == 'left') {
		ctx.drawImage(framesEnemy[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
	} else if(borderPosition == 'right') {
		ctx.drawImage(framesEnemyLeft[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
	}

	// Renderizo también al enemigo 2
	if(animationIndexEnemy2 >= 5) {
		animationIndexEnemy2 = 0
	}
	ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth2, enemyHeight2);

	// Renderizo a la bala
	//ctx.drawImage(asteroid, xFixed, positionYenemyBullet, enemyBulletsWidth, enemyBulletsHeight);

	collisionCheck();
	collisionCheck2();
	explosionsActivator();
}

// Función que mueve al personaje hacia la derecha
function moveRight() {
	if(collision ||collision2 || level_1_completed || exploded) {
		return;
	}
	positionY = positionY;
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	if(sublevel == 0) {
		layout();
	} else if(sublevel == 1) {
		layout2();
	} else if(sublevel == 2) {
		layout3();
	}
	shipPart(posXship, posYship);
	shipPartDisappear();
	levelWin();
	buttonPress();

	if(positionX < borders.right_border.xfinal - characterWidth) {
		positionX = positionX+movePixels;
		animationIndex++;
	}
	ctx.drawImage(sprite, framesWalking["right"][animationIndex].x, framesWalking["right"][animationIndex].y, framesWalking["right"][animationIndex].width, framesWalking["right"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);

	// Renderizo también al enemigo en la posición que tiene
	if(animationIndexEnemy >= 5) {
		animationIndexEnemy = 0
	}
	if(borderPosition == 'left') {
		ctx.drawImage(framesEnemy[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
	} else if(borderPosition == 'right') {
		ctx.drawImage(framesEnemyLeft[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
	}

	// Renderizo también al enemigo 2
	if(animationIndexEnemy2 >= 5) {
		animationIndexEnemy2 = 0
	}
	ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth2, enemyHeight2);

	// Renderizo a la bala
	//ctx.drawImage(asteroid, xFixed, positionYenemyBullet, enemyBulletsWidth, enemyBulletsHeight);

	collisionCheck();
	collisionCheck2();
	explosionsActivator();
}

// Variables de control para la función que moverá al personaje fluidamente al presionar una tecla y denetenerlo al soltarla
let movingRight = false;
let movingLeft = false;
let movingUp = false;
let movingDown = false;

// Función que detecta cuál tecla direccional fue presionada y cambia el valor de la variable correndiente a true
function moveByKeys(event) {
	if(event.key == 'ArrowUp' || event.key == 'w') {
		movingUp = true;
	}
	else if(event.key == 'ArrowDown' || event.key == 's') {
		movingDown = true;
	}
	else if(event.key == 'ArrowLeft' || event.key == 'a') {
		movingLeft = true;
	}
	else if(event.key == 'ArrowRight' || event.key == 'd') {
		movingRight = true;
	}
	// else if(event.key == ' ') {
	// 	sword();
	// }
}

// Función que detecta cuál tecla direccional fue liberada y cambia el valor de la variable correndiente a false
function stopMovement(event) {
	if(event.key == 'ArrowUp' || event.key == 'w') {
		movingUp = false;
	}
	else if(event.key == 'ArrowDown' || event.key == 's') {
		movingDown = false;
	}
	else if(event.key == 'ArrowLeft' || event.key == 'a') {
		movingLeft = false;
	}
	else if(event.key == 'ArrowRight' || event.key == 'd') {
		movingRight = false;
	}
}

// Eventos sobre la pantalla para que ejecuten las funciones anteriores cada vez que se presiona o se libera una tecla
window.addEventListener('keydown',moveByKeys, false);
window.addEventListener('keyup',stopMovement, false);

// Función para mover al personaje dependiendo de la tecla presionada
function moveCharacter() {
	if(collision || collision2 || level_1_completed || exploded) {
		return;
	}

	// Limpio las colisiones del escenario para que retome el movimiento en todas direcciones
	collisionUp = false;
	collisionDown = false;
	collisionLeft = false;
	collisionRight = false;

	if(sublevel == 0) {
		collisionWalls(walls);
	} else if(sublevel == 1) {
		collisionWalls(walls2);
	}
	

	if(movingUp == true && !collisionUp) {
		moveUp();
		if(animationIndex >= 3) {
			animationIndex = 0;
		}
	} else if(movingDown == true && !collisionDown) {
		moveDown();
		if(animationIndex >= 3) {
			animationIndex = 0;
		}
	} else if(movingLeft == true && !collisionLeft) {
		moveLeft();
		if(animationIndex >= 3) {
			animationIndex = 0;
		}
	} else if(movingRight == true && !collisionRight) {
		moveRight();
		if(animationIndex >= 3) {
			animationIndex = 0;
		}
	} else {
		animationIndex = 0;
	}
}


/* Enemigo */
// Caminar hacia la derecha
const frame1 = new Image();
frame1.src = './assets/imgs/blue-alien/walk-right/blue__0006_walk_1.png';

const frame2 = new Image();
frame2.src = './assets/imgs/blue-alien/walk-right/blue__0007_walk_2.png';

const frame3 = new Image();
frame3.src = './assets/imgs/blue-alien/walk-right/blue__0008_walk_3.png';

const frame4 = new Image();
frame4.src = './assets/imgs/blue-alien/walk-right/blue__0009_walk_4.png';

const frame5 = new Image();
frame5.src = './assets/imgs/blue-alien/walk-right/blue__0010_walk_5.png';

const frame6 = new Image();
frame6.src = './assets/imgs/blue-alien/walk-right/blue__0011_walk_6.png';

// Caminar hacia la izquierda
const frame1_izq = new Image();
frame1_izq.src = './assets/imgs/blue-alien/walk-right/blue__0006_walk_1_izq.png';

const frame2_izq = new Image();
frame2_izq.src = './assets/imgs/blue-alien/walk-right/blue__0007_walk_2_izq.png';

const frame3_izq = new Image();
frame3_izq.src = './assets/imgs/blue-alien/walk-right/blue__0008_walk_3_izq.png';

const frame4_izq = new Image();
frame4_izq.src = './assets/imgs/blue-alien/walk-right/blue__0009_walk_4_izq.png';

const frame5_izq = new Image();
frame5_izq.src = './assets/imgs/blue-alien/walk-right/blue__0010_walk_5_izq.png';

const frame6_izq = new Image();
frame6_izq.src = './assets/imgs/blue-alien/walk-right/blue__0011_walk_6_izq.png';

let framesEnemy = [frame1, frame2, frame3, frame4, frame5, frame6];
let framesEnemyLeft = [frame1_izq, frame2_izq, frame3_izq, frame4_izq, frame5_izq, frame6_izq];

let animationIndexEnemy = 0;

// Posición inicial
let positionXenemy = 200;
let positionYenemy = 518;
let borderPosition = 'left';

let enemyLeftLimit = 200;
let enemyRightLimit = 370;

// Píxeles que se mueve por cada toque de tecla
let movePixelsenemy = 10;


// Función que mueve al enemigo hacia la izquierda
function moveLeftEnemy() {
	if(collision || collision2 || level_1_completed || exploded) {
		clearInterval(characterMove);
		clearInterval(enemy1Move);
		clearInterval(enemy2Move);
		return;
	}
	positionYenemy = positionYenemy;
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	if(sublevel == 0) {
		layout();
	} else if(sublevel == 1) {
		layout2();
	} else if(sublevel == 2) {
		layout3();
	}
	shipPart(posXship, posYship);
	shipPartDisappear();
	levelWin();
	buttonPress();

	if(positionXenemy > enemyLeftLimit && borderPosition == 'right') {
		positionXenemy = positionXenemy-movePixelsenemy;

		animationIndexEnemy++
		if(animationIndexEnemy >= 5) {
			animationIndexEnemy = 0
		}
		ctx.drawImage(framesEnemyLeft[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);

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

		// Renderizo también al enemigo 2
		if(animationIndexEnemy2 >= 5) {
			animationIndexEnemy2 = 0
		}
		ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth2, enemyHeight2);

		// Renderizo a la bala
		//ctx.drawImage(asteroid, xFixed, positionYenemyBullet, enemyBulletsWidth, enemyBulletsHeight);

		collisionCheck();
		collisionCheck2();
		explosionsActivator();
	} else {
		borderPosition = 'left';
		moveRightenemy();
	}

}

// Función que mueve al personaje hacia la derecha
function moveRightenemy() {
	if(collision || collision2 || level_1_completed || exploded) {
		clearInterval(characterMove);
		clearInterval(enemy1Move);
		clearInterval(enemy2Move);
		return;
	}
	positionYenemy = positionYenemy;
	
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	if(sublevel == 0) {
		layout();
	} else if(sublevel == 1) {
		layout2();
	} else if(sublevel == 2) {
		layout3();
	}
	shipPart(posXship, posYship);
	shipPartDisappear();
	levelWin();
	buttonPress();

	if(positionXenemy < enemyRightLimit - enemyWidth && borderPosition == 'left') {
		positionXenemy = positionXenemy+movePixelsenemy;

		animationIndexEnemy++
		if(animationIndexEnemy >= 5) {
			animationIndexEnemy = 0
		}
		ctx.drawImage(framesEnemy[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);

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

		// Renderizo también al enemigo 2
		if(animationIndexEnemy2 >= 5) {
			animationIndexEnemy2 = 0
		}
		ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth2, enemyHeight2);

		// Renderizo a la bala
		// ctx.drawImage(asteroid, xFixed, positionYenemyBullet, enemyBulletsWidth, enemyBulletsHeight);

		collisionCheck();
		collisionCheck2();
		explosionsActivator();
	} else {
		borderPosition = 'right';
		moveLeftEnemy();
	}

}

/* Enemigo 2 */
// Caminar hacia abajo y arriba
const frame1_2 = new Image();
frame1_2.src = '../assets/imgs/blue-alien/walk-right/blue__0006_walk_1.png';

const frame2_2 = new Image();
frame2_2.src = '../assets/imgs/blue-alien/walk-right/blue__0007_walk_2.png';

const frame3_2 = new Image();
frame3_2.src = '../assets/imgs/blue-alien/walk-right/blue__0008_walk_3.png';

const frame4_2 = new Image();
frame4_2.src = '../assets/imgs/blue-alien/walk-right/blue__0009_walk_4.png';

const frame5_2 = new Image();
frame5_2.src = '../assets/imgs/blue-alien/walk-right/blue__0010_walk_5.png';

const frame6_2 = new Image();
frame6_2.src = '../assets/imgs/blue-alien/walk-right/blue__0011_walk_6.png';

let framesEnemy2 = [frame1_2, frame2_2, frame3_2, frame4_2, frame5_2, frame6_2];

let animationIndexEnemy2 = 0;

// Posición inicial
let positionXenemy2 = 310;
let positionYenemy2 = 0;
let borderPosition2 = 'up';

let enemy2UpLimit = 0;
let enemy2DownLimit = 277.8;

let enemyWidth2 = 35;
let enemyHeight2 = 53;

// Píxeles que se mueve por cada toque de tecla
let movePixelsenemy2 = 13;

// Función que mueve al enemigo hacia la izquierda
function moveUpEnemy() {
	if(collision || collision2 || level_1_completed || exploded) {
		clearInterval(characterMove);
		clearInterval(enemy1Move);
		clearInterval(enemy2Move);
		return;
	}
	positionXenemy2 = positionXenemy2;
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	if(sublevel == 0) {
		layout();
	} else if(sublevel == 1) {
		layout2();
	} else if(sublevel == 2) {
		layout3();
	}
	shipPart(posXship, posYship);
	shipPartDisappear();
	levelWin();
	buttonPress();

	if(positionYenemy2 > enemy2UpLimit && borderPosition2 == 'down') {
		positionYenemy2 = positionYenemy2-movePixelsenemy2;

		animationIndexEnemy2++
		if(animationIndexEnemy2 >= 5) {
			animationIndexEnemy2 = 0
		}
		ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth2, enemyHeight2);

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

		// Renderizo también al enemigo 1 en la posición que tiene
		if(animationIndexEnemy >= 5) {
			animationIndexEnemy = 0
		}
		if(borderPosition == 'left') {
			ctx.drawImage(framesEnemy[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
		} else if(borderPosition == 'right') {
			ctx.drawImage(framesEnemyLeft[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
		}

		// Renderizo a la bala
		//ctx.drawImage(asteroid, xFixed, positionYenemyBullet, enemyBulletsWidth, enemyBulletsHeight);

		collisionCheck();
		collisionCheck2();
		explosionsActivator();
	} else {
		borderPosition2 = 'up';
		moveDownEnemy();
	}
}

// Función que mueve al personaje hacia la derecha
function moveDownEnemy() {
	if(collision ||collision2 || level_1_completed || exploded) {
		clearInterval(characterMove);
		clearInterval(enemy1Move);
		clearInterval(enemy2Move);
		return;
	}
	positionXenemy2 = positionXenemy2;

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	if(sublevel == 0) {
		layout();
	} else if(sublevel == 1) {
		layout2();
	} else if(sublevel == 2) {
		layout3();
	}
	shipPart(posXship, posYship);
	shipPartDisappear();
	levelWin();
	buttonPress();

	if(positionYenemy2 < enemy2DownLimit - enemyHeight2 && borderPosition2 == 'up') {
		positionYenemy2 = positionYenemy2+movePixelsenemy2;

		animationIndexEnemy2++
		if(animationIndexEnemy2 >= 5) {
			animationIndexEnemy2 = 0
		}
		ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth2, enemyHeight2);

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

		// Renderizo también al enemigo 1 en la posición que tiene
		if(animationIndexEnemy >= 5) {
			animationIndexEnemy = 0
		}
		if(borderPosition == 'left') {
			ctx.drawImage(framesEnemy[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
		} else if(borderPosition == 'right') {
			ctx.drawImage(framesEnemyLeft[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
		}

		// Renderizo a la bala
		// ctx.drawImage(asteroid, xFixed, positionYenemyBullet, enemyBulletsWidth, enemyBulletsHeight);

		collisionCheck();
		collisionCheck2();
		explosionsActivator();
	} else {
		borderPosition2 = 'down';
		moveUpEnemy();
	}
}


/* Balas enemigo */
// const asteroid = new Image();
// asteroid.src = './assets/imgs/asteroids/Asteroid01-Base.png';

// const enemyBulletsWidth = 70;
// const enemyBulletsHeight = 70;
// let positionXenemyBullet = 135;
// const xFixed = 100;
// let positionYenemyBullet = 0;


// Píxeles que se mueve por cada toque de tecla
//const movePixelsBullet = 10;


// Función que mueve la bala hacia abajo
// function bulletMoveDown() {
// 	if(collision) {
// 		return;
// 	}

// 	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

// 	ctx.drawImage(asteroid, xFixed, positionYenemyBullet, enemyBulletsWidth, enemyBulletsHeight);

// 	layout();
// 	shipPart(posXship, posYship);

// 	if(positionYenemyBullet < borders.lower_border.yfinal /*- enemyBulletsHeight*/) {
// 		positionYenemyBullet = positionYenemyBullet+movePixelsBullet;

// 		ctx.drawImage(asteroid, xFixed, positionYenemyBullet, enemyBulletsWidth, enemyBulletsHeight);

// 		// Renderizo también al personaje
// 		if(movingRight) {
// 			ctx.drawImage(sprite, framesWalking["right"][animationIndex].x, framesWalking["right"][animationIndex].y, framesWalking["right"][animationIndex].width, framesWalking["right"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
// 		} else if(movingUp) {
// 			ctx.drawImage(sprite, framesWalking["up"][animationIndex].x, framesWalking["up"][animationIndex].y, framesWalking["up"][animationIndex].width, framesWalking["up"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
// 		} else if(movingLeft) {
// 			ctx.drawImage(sprite, framesWalking["left"][animationIndex].x, framesWalking["left"][animationIndex].y, framesWalking["left"][animationIndex].width, framesWalking["left"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
// 		} else if(movingDown) {
// 			ctx.drawImage(sprite, framesWalking["down"][animationIndex].x, framesWalking["down"][animationIndex].y, framesWalking["down"][animationIndex].width, framesWalking["down"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
// 		} else {
// 			ctx.drawImage(sprite, framesWalking["down"]["0"].x, framesWalking["down"]["0"].y, framesWalking["down"]["0"].width, framesWalking["down"]["0"].height, positionX, positionY, characterWidth, characterHeight);
// 		}

// 		// Renderizo también al enemigo en la posición que tiene
// 		if(animationIndexEnemy >= 5) {
// 			animationIndexEnemy = 0
// 		}
// 		if(borderPosition == 'left') {
// 			ctx.drawImage(framesEnemy[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
// 		} else if(borderPosition == 'right') {
// 			ctx.drawImage(framesEnemyLeft[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
// 		}
// 		collisionCheck();
// 	} else {
// 		// Renderizo al personaje
// 		if(movingRight) {
// 			ctx.drawImage(sprite, framesWalking["right"][animationIndex].x, framesWalking["right"][animationIndex].y, framesWalking["right"][animationIndex].width, framesWalking["right"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
// 		} else if(movingUp) {
// 			ctx.drawImage(sprite, framesWalking["up"][animationIndex].x, framesWalking["up"][animationIndex].y, framesWalking["up"][animationIndex].width, framesWalking["up"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
// 		} else if(movingLeft) {
// 			ctx.drawImage(sprite, framesWalking["left"][animationIndex].x, framesWalking["left"][animationIndex].y, framesWalking["left"][animationIndex].width, framesWalking["left"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
// 		} else if(movingDown) {
// 			ctx.drawImage(sprite, framesWalking["down"][animationIndex].x, framesWalking["down"][animationIndex].y, framesWalking["down"][animationIndex].width, framesWalking["down"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
// 		} else {
// 			ctx.drawImage(sprite, framesWalking["down"]["0"].x, framesWalking["down"]["0"].y, framesWalking["down"]["0"].width, framesWalking["down"]["0"].height, positionX, positionY, characterWidth, characterHeight);
// 		}

// 		// Renderizo al enemigo en la posición que tiene
// 		if(animationIndexEnemy >= 5) {
// 			animationIndexEnemy = 0
// 		}
// 		if(borderPosition == 'left') {
// 			ctx.drawImage(framesEnemy[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
// 		} else if(borderPosition == 'right') {
// 			ctx.drawImage(framesEnemyLeft[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
// 		}
// 		collisionCheck();
// 		setTimeout( ()=>{
// 			positionYenemyBullet = -70;

// 		}, 800)
// 	}
// }

// Renderizar Bala
// const renderBullet = (timeIntervalBullet) => {
// 			setInterval(bulletMoveDown,timeIntervalBullet);
// 			console.log(timeIntervalBullet);
// };

 /* COLISIONES */
let collision = false;

const audio_collision = new Audio("./assets/effects/vgdeathsound.wav");
function collisionCheck() {
	// Alien 1
	if((positionXenemy < positionX+characterWidth-10) && (positionXenemy+enemyWidth-10)>positionX) {
		if(((positionYenemy+enemyHeight-5)>positionY) && (positionYenemy < (positionY+characterHeight-5))) {
			collision = true;
			console.log('collision', collision);
			console.log('Hay colisión!!!');
			audio_background.pause();
			audio_background.currentTime = 0;

			const notifications = document.getElementById('notifications');
			notifications.innerText = "Capturado por un alienígena! Vuelve a intentarlo!";
			// setTimeout(()=>{
			// 	notifications.innerText = "";
			// }, 3000)

			// Reproducir sonido cuando colisiona con elenemigo
			audio_collision.play();
			setTimeout(()=> {
				audio_collision.pause();
			}, 2500);
			audio_collision.currentTime = 0;

			// Espera 3 segundos para reinicair juego
			setTimeout(() => {
				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
				collision = false;

				notifications.innerText = "";
				// Reiniciar heroe
				animationIndex = 0;
				if(sublevel == 0) {
					positionX = 0;
					positionY = canvasHeight - characterHeight;

					// Reiniciar enemigo
					animationIndexEnemy = 0;
					positionXenemy = 200;
					positionYenemy = 518;
					borderPosition = 'left';

					// Reiniciar enemigo 2
					animationIndexEnemy2 = 0;
					positionXenemy2 = 300;
					positionYenemy2 = 0;
					borderPosition2 = 'up';
				} /*else if(sublevel == 1) {
					positionX = canvasWidth-60;
					positionY = 10;
				}*/

				// Reiniciar enemigo
				// animationIndexEnemy = 0;
				// positionXenemy = 200;
				// positionYenemy = 518;
				// borderPosition = 'left';

				// Reiniciar enemigo 2
				// animationIndexEnemy2 = 0;
				// positionXenemy2 = 300;
				// positionYenemy2 = 0;
				// borderPosition2 = 'up';

				// Reinicio la parte de la nave en el mapa
				partTaken = false;

				// Limpio el contenedor de partes de nave
				if(sublevel == 0) {
					ship_part_container.innerHTML = "";
				} else if(sublevel == 1){
					if(ship_part_container.children.length>1 ) {
						ship_part_container.removeChild(ship_part_container.lastChild);
					}
				} else if(sublevel == 2) {
					if(ship_part_container.children.length>2 ) {
						ship_part_container.removeChild(ship_part_container.lastChild);
					}
				}

				audio_active= false;
				// Reinicar bala
				// positionXenemyBullet = undefined;
				//positionYenemyBullet = 0;

				// Reinicar juego
				if(sublevel == 0) {
					startGame(80, 140, 100);
				} else if(sublevel == 1) {
					startLevel2(80, 140, 100);
				} else if(sublevel == 2) {
					startLevel3(80, 140, 100);
				}

			}, 3000);
		} else {
			collision = false;
		}
	} else {
		collision = false;
	}
}


let collision2 = false;

function collisionCheck2() {
	// Alien 2
	if((positionXenemy2 < positionX+characterWidth-10) && (positionXenemy2+enemyWidth2-10)>positionX) {
		if(((positionYenemy2+enemyHeight2-5)>positionY) && (positionYenemy2 < (positionY+characterHeight-5))) {
			collision2 = true;
			console.log('collision2', collision2);
			console.log('Hay colisión 2!!!');
			audio_background.pause();
			audio_background.currentTime = 0;

			// Reproducir sonido cuando colisiona con elenemigo
			audio_collision.play();
			setTimeout(()=> {
				audio_collision.pause();
			}, 2500);
			audio_collision.currentTime = 0;

			const notifications = document.getElementById('notifications');
			notifications.innerText = "Capturado por un alienígena! Vuelve a intentarlo!";
			// setTimeout(()=>{
			// 	notifications.innerText = "";
			// }, 3000)

			// Espera 3 segundos para reinicair juego
			setTimeout(() => {
				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
				collision2 = false;

				notifications.innerText = "";
				// Reiniciar héroe
				animationIndex = 0;
				if(sublevel == 0) {
					positionX = 0;
					positionY = canvasHeight - characterHeight;

						// Reiniciar enemigo
					animationIndexEnemy = 0;
					positionXenemy = 200;
					positionYenemy = 518;
					borderPosition = 'left';

					// Reiniciar enemigo 2
					animationIndexEnemy2 = 0;
					positionXenemy2 = 300;
					positionYenemy2 = 0;
					borderPosition2 = 'up';
				} /*else if(sublevel == 1) {
					positionX = canvasWidth-60;
					positionY = 10;
				}*/

				// Reiniciar enemigo
				// animationIndexEnemy = 0;
				// positionXenemy = 200;
				// positionYenemy = 518;
				// borderPosition = 'left';

				// Reiniciar enemigo 2
				// animationIndexEnemy2 = 0;
				// positionXenemy2 = 300;
				// positionYenemy2 = 0;
				// borderPosition2 = 'up';

				// Reinicio la parte de la nave en el mapa
				partTaken = false;

				// Limpio el contenedor de partes de nave
				if(sublevel == 0) {
					ship_part_container.innerHTML = "";
				} else if(sublevel == 1){
					if(ship_part_container.children.length>1 ) {
						ship_part_container.removeChild(ship_part_container.lastChild);
					}
				} else if(sublevel == 2) {
					if(ship_part_container.children.length>2 ) {
						ship_part_container.removeChild(ship_part_container.lastChild);
					}
				}

				audio_active= false;

				// Reinicar bala
				// positionXenemyBullet = undefined;
				//positionYenemyBullet = 0;

				// Reinicar juego
				if(sublevel == 0) {
					startGame(80, 140, 100);
				} else if(sublevel == 1) {
					startLevel2(80, 140, 100);
				} else if(sublevel == 2) {
					startLevel3(80, 140, 100);
				}
			}, 3000);
		} else {
			collision2 = false;
		}
	} else {
		collision2 = false;
	}
}


let audio_active = false;
const audio_background = new Audio("./assets/effects/level5.ogg");

let characterMove;
let enemy1Move;
let enemy2Move;

function startGame(timeIntervalHeroe, timeIntervalEnemy1, timeIntervalEnemy2) {
	const videogame_word = document.querySelector('.videogame-word');
	videogame_word.style.display = 'none';

	level_p.innerHTML = sublevel+1;

	// Reproducir sonido cuando inicia el juego
	if(!audio_active) {
		audio_active = true;
		audio_background.play();
		audio_background.loop = true;
		audio_background.volume = 0.2;
	}
	// Renderizar mapa
	layout();

	// Renderizar parte de nave
	shipPart(posXship, posYship);
	shipPartDisappear();
	levelWin();

	// Renderizar Héroe
	ctx.drawImage(sprite, framesWalking["down"][animationIndex].x, framesWalking["down"][animationIndex].y, framesWalking["down"][animationIndex].width, framesWalking["down"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);
	characterMove = setInterval(moveCharacter, timeIntervalHeroe);

	// Renderizar Enemigo
	ctx.drawImage(framesEnemy[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);
	enemy1Move = setInterval(moveRightenemy, timeIntervalEnemy1);

	// Renderizar Enemigo 2
	ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth2, enemyHeight2);
	enemy2Move = setInterval(moveDownEnemy, timeIntervalEnemy2);

	// Detener renederizado si hubo colisión
	if(collision || collision2 || level_1_completed) {
		clearInterval(characterMove);
		clearInterval(enemy1Move);
		clearInterval(enemy2Move);
		return;
	}
}

//let first_start = true;
const start_button = document.getElementById("start_btn");
start_button.addEventListener('click', ()=> {
	clearInterval(characterMove);
	clearInterval(enemy1Move);
	clearInterval(enemy2Move);

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	collision = false;
	collision2 = false;
	sublevel = 0;

	// Reiniciar heroe
	animationIndex = 0;
	positionX = 0;
	positionY = canvasHeight - characterHeight;

	// Reiniciar enemigo
	framesEnemy = [frame1, frame2, frame3, frame4, frame5, frame6];
	framesEnemyLeft = [frame1_izq, frame2_izq, frame3_izq, frame4_izq, frame5_izq, frame6_izq];
	movePixelsenemy = 10;
	animationIndexEnemy = 0;
	positionXenemy = 200;
	positionYenemy = 518;
	borderPosition = 'left';
	enemyLeftLimit = 200;
	enemyRightLimit = 370;
	

	// Reiniciar enemigo 2
	framesEnemy2 = [frame1_2, frame2_2, frame3_2, frame4_2, frame5_2, frame6_2];
	animationIndexEnemy2 = 0;
	movePixelsenemy2 = 13;
	positionXenemy2 = 300;
	positionYenemy2 = 0;
	borderPosition2 = 'up';
	enemy2UpLimit = 0;
	enemy2DownLimit = 277.8;

	// Reinicio la parte de la nave en el mapa
	posXship = 30;
	posYship = 60;
	partTaken = false;

	// Limpio el contenedor de partes de nave
	ship_part_container.innerHTML = "";

	//if(first_start) {
		startGame(80, 140, 100);
	//} else {
		//startGame(80**2, 140**2, 100**2);
	//}
	//first_start = false;

});


/* NIVEL 2 */

const layout2 = () => {
	// Suelo marrón cubre todo el canvas
	for(let i = 0; i <= canvasHeight; i=i+20) {
		renderBackground(backgroundTiles, 6, 0, i, 20, 20);
		for(let j = 0; j <= canvasWidth; j=j+20) {
			renderBackground(backgroundTiles, 6, j, i, 20, 20);
		}
	}

	// Marcas de arena rojiza
	renderBackground(backgroundTiles, 7, canvasWidth/3, canvasHeight/3, 30, 30);
	renderBackground(backgroundTiles, 7, canvasWidth/1.3, canvasHeight/15, 30, 30);
	renderBackground(backgroundTiles, 7, canvasWidth/13, canvasHeight/5, 30, 30);
	renderBackground(backgroundTiles, 7, canvasWidth/1.1, canvasHeight/1.5, 30, 30);
	renderBackground(backgroundTiles, 7, canvasWidth/13, canvasHeight/1.3, 30, 30); // Bomba
	renderBackground(backgroundTiles, 7, canvasWidth/2, canvasHeight/1.1, 30, 30);
	renderBackground(backgroundTiles, 7, canvasWidth/1.4, canvasHeight/2, 30, 30);
	renderBackground(backgroundTiles, 7, canvasWidth/70, canvasHeight/1.7, 30, 30); // Bomba

	// Rocas grises en arena rojiza
	renderBackground(backgroundTiles, 8, canvasWidth/5, canvasHeight/4, 30, 30);
	renderBackground(backgroundTiles, 8, canvasWidth/1.7, canvasHeight/1.5, 30, 30);
	renderBackground(backgroundTiles, 8, canvasWidth/1.2, canvasHeight/7, 30, 30);
	renderBackground(backgroundTiles, 8, canvasWidth/1.1, canvasHeight/1.2, 30, 30);
	renderBackground(backgroundTiles, 8, canvasWidth/30, canvasHeight/1.1, 30, 30);

	/* Paredes */
	// Horizontales
	renderWalls(walls3Dtiles, 5, 361, 145, 32, 32);
	for(let i = 393; i <= canvasWidth-32; i=i+32) {
		renderWalls(walls3Dtiles, 3, i, 145, 32, 32);
	}
	renderWalls(walls3Dtiles, 4, canvasWidth-32, 145, 32, 32);

	renderWalls(walls3Dtiles, 5, 100, 400, 32, 32);
	for(let i = 132; i <= 450; i=i+32) {
		renderWalls(walls3Dtiles, 3, i, 400, 32, 32);
	}
	renderWalls(walls3Dtiles, 4, 450, 400, 32, 32);

	renderWalls(walls3Dtiles, 5, 100, 550, 32, 32);
	for(let i = 132; i <= 320; i=i+32) {
		renderWalls(walls3Dtiles, 3, i, 550, 32, 32);
	}
	renderWalls(walls3Dtiles, 4, 320, 550, 32, 32);

	renderWalls(walls3Dtiles, 5, 424, 550, 32, 32);
	for(let i = 456; i <= 600; i=i+32) {
		renderWalls(walls3Dtiles, 3, i, 550, 32, 32);
	}
	renderWalls(walls3Dtiles, 4, 600, 550, 32, 32);


	// Verticales
	renderWalls(walls3Dtiles, 2, 100, 0, 32, 32);
	for(let i = 32; i <= 550; i=i+32) {
		renderWalls(walls3Dtiles, 1, 100, i, 32, 32);
	}
	renderWalls(walls3Dtiles, 0, 100, 550, 32, 32);

	renderWalls(walls3Dtiles, 2, 452, 250, 32, 32);
	for(let i = 282; i <= 368; i=i+32) {
		renderWalls(walls3Dtiles, 1, 452, i, 32, 32);
	}
	renderWalls(walls3Dtiles, 0, 452, 368, 32, 32);

	renderWalls(walls3Dtiles, 2, 600, 250, 32, 32);
	for(let i = 282; i <= 336; i=i+32) {
		renderWalls(walls3Dtiles, 1, 600, i, 32, 32);
	}
	renderWalls(walls3Dtiles, 0, 600, 336, 32, 32);

	renderWalls(walls3Dtiles, 2, 600, 432, 32, 32);
	for(let i = 464; i <= 518; i=i+32) {
		renderWalls(walls3Dtiles, 1, 600, i, 32, 32);
	}
	renderWalls(walls3Dtiles, 0, 600, 518, 32, 32);

	// Cápsula
	xCapsule = 22.5;
	yCapsule = 10;
	widthCapsule = 55;
	heightCapsule = 106;
	renderCapsule(capsuleSprites, 0, xCapsule, yCapsule, widthCapsule, heightCapsule);
}

// Array con la información de todas las paredes del nivel 2
const walls2 = [
	// Horizontales
	wall_h1 = {
		x: 361,
		y: 145,
		width: 339,
		height: 32
	},
	wall_h2 = {
		x: 100,
		y: 400,
		width: 382,
		height: 32
	},
	wall_h3 = {
		x: 100,
		y: 550,
		width: 252,
		height: 32
	},
	wall_h4 = {
		x: 424,
		y: 550,
		width: 208,
		height: 32
	},
	wall_v1 = {
		x: 100,
		y: 0,
		width: 32,
		height: 550
	},
	wall_v2 = {
		x: 452,
		y: 250,
		width: 32,
		height: 118
	},
	wall_v3 = {
		x: 600,
		y: 250,
		width: 32,
		height: 118
	},
	wall_v4 = {
		x: 600,
		y: 432,
		width: 32,
		height: 118
	}
];

/* NAVE */
const part2 = document.createElement('img');
part2.src = '../assets/imgs/ship1/parts/ship1_detail.png';

function startLevel2(timeIntervalHeroe, timeIntervalEnemy1, timeIntervalEnemy2) {
	
	level_p.innerHTML = sublevel+1;

	level_1_completed = false;
	posXship = canvasWidth-shipWidth-10;
	posYship = canvasHeight-60;

	shipWidth = (ships[level].parts[sublevel].width)*1.1;
	shipHeight = (ships[level].parts[sublevel].height)*1.1;

	partTaken = false;

	// Posición inicial del héroe sobre el canvas
	positionX = canvasWidth-60;
	positionY = 10;

    // Reproducir sonido cuando inicia el juego
    if(!audio_active) {
        audio_active = true;
        audio_background.play();
        audio_background.loop = true;
        audio_background.volume = 0.2;
    }
    // Renderizar mapa
    layout2();

    // Renderizar parte de nave
	shipPart(posXship, posYship);
	shipPartDisappear();
	levelWin();

    // Renderizar Héroe
    animationIndex = 0;
    // positionX = canvasWidth-characterWidth;
    // positionY = 10;

	ctx.drawImage(sprite, framesWalking["down"][animationIndex].x, framesWalking["down"][animationIndex].y, framesWalking["down"][animationIndex].width, framesWalking["down"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);

	characterMove = setInterval(moveCharacter, timeIntervalHeroe);

    // Renderizar Enemigo
    animationIndexEnemy = 0;
	movePixelsenemy = 15;

    positionXenemy = 484;
    positionYenemy = 368;
    borderPosition = 'left';

	enemyLeftLimit = 484;
	enemyRightLimit = 690;

	ctx.drawImage(framesEnemy[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);

	enemy1Move = setInterval(moveRightenemy, timeIntervalEnemy1);

	// Renderizar Enemigo 2
	animationIndexEnemy2 = 0;
	movePixelsenemy2 = 18;

    positionXenemy2 = 366;
    positionYenemy2 = 432;
    borderPosition2 = 'up';

	enemy2UpLimit = 432;
	enemy2DownLimit = 690;
	ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth2, enemyHeight2);

	enemy2Move = setInterval(moveDownEnemy, timeIntervalEnemy2);

    // Detener renederizado si hubo colisión
	if(collision || collision2 || level_1_completed || exploded) {
		return;
	}
}

// Explosiones
let animationIndexExplosion = 0;
let exploded = false;

function explosion() {
	ctx.drawImage(explosionSprite, explosionTiles[animationIndexExplosion].x, explosionTiles[animationIndexExplosion].y, explosionTiles[animationIndexExplosion].width, explosionTiles[animationIndexExplosion].height, canvasWidth/13 -15, canvasHeight/1.3 -30, 60, 60);

	animationIndexExplosion++;

	if(animationIndexExplosion >= 11) {
		animationIndexExplosion = 0;
	}
}

function explosion2() {
	ctx.drawImage(explosionSprite, explosionTiles[animationIndexExplosion].x, explosionTiles[animationIndexExplosion].y, explosionTiles[animationIndexExplosion].width, explosionTiles[animationIndexExplosion].height, canvasWidth/70 -15, canvasHeight/1.7 - 30, 60, 60);

	animationIndexExplosion++;

	if(animationIndexExplosion >= 11) {
		animationIndexExplosion = 0;
	}
}

function explosionsActivator() {
	if(sublevel == 1) {
		let bomb1 = (positionX+characterWidth/2 > canvasWidth/13 && positionX+characterWidth/2 < canvasWidth/13+30) && (positionY+characterHeight < canvasHeight/1.3 + 30 && positionY+characterHeight > canvasHeight/1.3);

		let bomb2 = (positionX+characterWidth/2 > canvasWidth/70 && positionX+characterWidth/2 < canvasWidth/70+30) && (positionY+characterHeight < canvasHeight/1.7 + 30 && positionY+characterHeight > canvasHeight/1.7);

		if(/*(positionX+characterWidth/2 > canvasWidth/13 && positionX+characterWidth/2 < canvasWidth/13+30) && (positionY+characterHeight/2 < canvasHeight/1.3 + 30 && positionY+characterHeight/2 > canvasHeight/1.3)*/bomb1 || bomb2) {
			exploded = true;

			let effect1;
			let effect2;
			if(bomb1) {
				effect1 = setInterval(explosion, 250);
			} else if(bomb2) {
				effect2 = setInterval(explosion2, 250);
			}
			

			audio_background.pause();
			audio_background.currentTime = 0;

			// Reproducir sonido cuando colisiona con la mina
			const audio_explosion = new Audio;
			audio_explosion.src = '../assets/effects/atari_boom5.wav';
			audio_explosion.play();
			setTimeout(()=> {
				audio_explosion.pause();
			}, 1000);
			audio_explosion.currentTime = 0;

			const notifications = document.getElementById('notifications');
			notifications.innerText = "Has pisado una mina! Vuelve a intentarlo!";
			setTimeout(()=>{
				notifications.innerText = "";
			}, 3000)

			// Espera 3 segundos para reinicair juego
			setTimeout(() => {
				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
				exploded = false;

				if(bomb1) {
					clearInterval(effect1);
				} else if(bomb2) {
					clearInterval(effect2);
				}


				// Limpio el contenedor de partes de nave
				if(sublevel == 0) {
					ship_part_container.innerHTML = "";
				} else if(sublevel == 1){
					if(ship_part_container.children.length>1 ) {
						ship_part_container.removeChild(ship_part_container.lastChild);
					}
				} else if(sublevel == 2) {
					if(ship_part_container.children.length>2 ) {
						ship_part_container.removeChild(ship_part_container.lastChild);
					}
				}

				audio_active= false;

				animationIndexExplosion = 0;

				// Reinicar el nivel
				startLevel2(80, 140, 100);

			}, 3000);
		}
	}
}

const button_pressing = new Audio();
button_pressing.src = '../assets/effects/button.mp3';

function buttonPress() {
	if((positionX+characterWidth/2 > xButton && positionX+characterWidth/2 < xButton+30) && (positionY+characterHeight < yButton + 30 && positionY+characterHeight > yButton)) {
		button_pressing.play();
		setTimeout( () => {
			button_pressing.pause();
			button_pressing.currentTime = 0;
		}, 500);
	}
}


/* NIVEL 3 */

const layout3 = () => {
	// Suelo marrón cubre todo el canvas
	for(let i = 0; i <= canvasHeight; i=i+20) {
		renderBackground(backgroundTiles, 0, 0, i, 20, 20);
		for(let j = 0; j <= canvasWidth; j=j+20) {
			renderBackground(backgroundTiles, 0, j, i, 20, 20);
		}
	}

	// Marcas de arena
	renderBackground(backgroundTiles, 1, canvasWidth/2, canvasHeight/5, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/3, canvasHeight/3, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/5, canvasHeight/15, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/13, canvasHeight/5, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/1.1, canvasHeight/1.5, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/7, canvasHeight/1.3, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/2, canvasHeight/1.1, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/1.5, canvasHeight/2, 30, 30);
	renderBackground(backgroundTiles, 1, canvasWidth/4, canvasHeight/1.7, 30, 30);

	// Rocas grises
	renderBackground(backgroundTiles, 2, canvasWidth/5, canvasHeight/4, 30, 30);
	renderBackground(backgroundTiles, 2, canvasWidth/1.7, canvasHeight/1.5, 30, 30);
	renderBackground(backgroundTiles, 2, canvasWidth/1.2, canvasHeight/7, 30, 30);
	renderBackground(backgroundTiles, 2, canvasWidth/1.1, canvasHeight/1.2, 30, 30);
	renderBackground(backgroundTiles, 2, canvasWidth/30, canvasHeight/1.7, 30, 30);

	/* Paredes */
	renderWallsBrick(wallsBrickTiles, 2, 0, 80, 72, 64);
	for(let i = 72; i <= canvasWidth-178; i=i+56) {
		renderWallsBrick(wallsBrickTiles, 1, i, 82, 56, 62);
	}
	renderWallsBrick(wallsBrickTiles, 3, 522, 80, 70, 64);

	renderWallsBrick(wallsBrickTiles, 2, 108, 190, 72, 64);
	for(let i = 180; i <= canvasWidth-70; i=i+56) {
		renderWallsBrick(wallsBrickTiles, 1, i, 192, 56, 62);
	}

	renderWallsBrick(wallsBrickTiles, 0, 348, 192, 12, 64); // Vertical
	renderWallsBrick(wallsBrickTiles, 4, 348, 234, 78, 64);
	renderWallsBrick(wallsBrickTiles, 0, 414, 192, 12, 64); // Vertical
	renderWallsBrick(wallsBrickTiles, 3, 630, 190, 70, 64);

	renderWallsBrick(wallsBrickTiles, 2, 0, 355, 72, 64);
	for(let i = 72; i <= canvasWidth-178; i=i+56) {
		renderWallsBrick(wallsBrickTiles, 1, i, 357, 56, 62);
	}
	renderWallsBrick(wallsBrickTiles, 3, 522, 355, 70, 64);

	renderWallsBrick(wallsBrickTiles, 0, 580, 355, 12, 64); // Vertical
	renderWallsBrick(wallsBrickTiles, 0, 580, 419, 12, 64); // Vertical

	renderWallsBrick(wallsBrickTiles, 2, 108, 483, 72, 64);
	for(let i = 180; i <= canvasWidth-178; i=i+56) {
		renderWallsBrick(wallsBrickTiles, 1, i, 485, 56, 62);
	}
	renderWallsBrick(wallsBrickTiles, 3, 522, 483, 70, 64);

	// Cápsula
	xCapsule = (canvasWidth/2) - 27.5;
	yCapsule = 370;
	widthCapsule = 55;
	heightCapsule = 106;
	renderCapsule(capsuleSprites, 0, xCapsule, yCapsule, widthCapsule, heightCapsule);

	// Cannon
	xCannon = canvasWidth - 125;
	yCannon = canvasHeight - 100;
	widthCannon = 120;
	heightCannon = 66;
	renderCannon(cannonSprites, 0, xCannon, yCannon, widthCannon, heightCannon);

	// Botón
	xButton = canvasWidth - 60;
	yButton = 274;
	widthButton = 32;
	heightButton = 32;
	renderButton(buttonSprites, 0, xButton, yButton, widthButton, heightButton);
}


// Array con la información de todas las paredes del nivel 3
const walls3 = [
	// Horizontales
	wall_h1 = {
		x: 361,
		y: 145,
		width: 339,
		height: 32
	},
	wall_h2 = {
		x: 100,
		y: 400,
		width: 382,
		height: 32
	},
	wall_h3 = {
		x: 100,
		y: 550,
		width: 252,
		height: 32
	},
	wall_h4 = {
		x: 424,
		y: 550,
		width: 208,
		height: 32
	},
	wall_v1 = {
		x: 100,
		y: 0,
		width: 32,
		height: 550
	},
	wall_v2 = {
		x: 452,
		y: 250,
		width: 32,
		height: 118
	},
	wall_v3 = {
		x: 600,
		y: 250,
		width: 32,
		height: 118
	},
	wall_v4 = {
		x: 600,
		y: 432,
		width: 32,
		height: 118
	}
];

/* NAVE */
const part3 = document.createElement('img');
part3.src = '../assets/imgs/ship1/parts/ship1_nose.png';

/* ENEMIGO ROJO */
const frame1red = new Image();
frame1red.src = '../assets/imgs/red-alien/walk/red__0006_walk_1.png';

const frame2red = new Image();
frame2red.src = '../assets/imgs/red-alien/walk/red__0007_walk_2.png';

const frame3red = new Image();
frame3red.src = '../assets/imgs/red-alien/walk/red__0008_walk_3.png';

const frame4red = new Image();
frame4red.src = '../assets/imgs/red-alien/walk/red__0009_walk_4.png';

const frame5red = new Image(); 
frame5red.src = './assets/imgs/red-alien/walk/red__0010_walk_5.png';

const frame6red = new Image(); 
frame6red.src = '../assets/imgs/red-alien/walk/red__0011_walk_6.png';

// Caminar hacia la izquierda
const frame1red_left = new Image(); 
frame1red_left.src = '../assets/imgs/red-alien/walk/red__0006_walk_1_left.png';

const frame2red_left = new Image(); 
frame2red_left.src = '../assets/imgs/red-alien/walk/red__0007_walk_2_left.png';

const frame3red_left = new Image();
frame3red_left.src = '../assets/imgs/red-alien/walk/red__0008_walk_3_left.png';

const frame4red_left = new Image();
frame4red_left.src = '../assets/imgs/red-alien/walk/red__0009_walk_4_left.png';

const frame5red_left = new Image();
frame5red_left.src = '../assets/imgs/red-alien/walk/red__0010_walk_5_left.png';

const frame6red_left = new Image();
frame6red_left.src = '../assets/imgs/red-alien/walk/red__0011_walk_6_left.png';

function startLevel3(timeIntervalHeroe, timeIntervalEnemy1, timeIntervalEnemy2) {
	
	level_p.innerHTML = sublevel+1;

	level_1_completed = false;
	posXship = 15;
	posYship = canvasHeight-60;

	shipWidth = (ships[level].parts[sublevel].width)*1.1;
	shipHeight = (ships[level].parts[sublevel].height)*1.1;

	partTaken = false;

	// Posición inicial del héroe sobre el canvas
	positionX = 10;
	positionY = 10;

    // Reproducir sonido cuando inicia el juego
    if(!audio_active) {
        audio_active = true;
        audio_background.play();
        audio_background.loop = true;
        audio_background.volume = 0.2;
    }
    // Renderizar mapa
    layout3();

    // Renderizar parte de nave
	shipPart(posXship, posYship);
	shipPartDisappear();
	levelWin();
	buttonPress();

    // Renderizar Héroe
    animationIndex = 0;
    // positionX = 10;
    // positionY = 10;

	ctx.drawImage(sprite, framesWalking["down"][animationIndex].x, framesWalking["down"][animationIndex].y, framesWalking["down"][animationIndex].width, framesWalking["down"][animationIndex].height, positionX, positionY, characterWidth, characterHeight);

	characterMove = setInterval(moveCharacter, timeIntervalHeroe);

    // Renderizar Enemigo
    animationIndexEnemy = 0;
	movePixelsenemy = 22;

    positionXenemy = 108;
    positionYenemy = 119;
    borderPosition = 'left';

	enemyLeftLimit = 108;
	enemyRightLimit = 690;

	ctx.drawImage(framesEnemy[animationIndexEnemy], positionXenemy, positionYenemy, enemyWidth, enemyHeight);

	enemy1Move = setInterval(moveRightenemy, timeIntervalEnemy1);

	// Renderizar Enemigo 2
	animationIndexEnemy2 = 0;
	movePixelsenemy2 = 30;

    positionXenemy2 = 366;
    positionYenemy2 = 522;
    borderPosition2 = 'up';

	enemy2UpLimit = 522;
	enemy2DownLimit = 690;
	ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth2, enemyHeight2);

	enemy2Move = setInterval(moveDownEnemy, timeIntervalEnemy2);

    // Detener renederizado si hubo colisión
	if(collision || collision2 || level_1_completed || exploded) {
		return;
	}
}