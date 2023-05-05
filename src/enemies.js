
//PROTIPO (CLASE) PARA LOS ENEMIGOS
class Enemies {
	constructor({
		nombre,
		framesEnemyLeft = [],
		framesEnemyRight = [],
        framesEnemyUp = [],
        framesEnemyDown = [],
        animationIndexEnemy,
        positionXenemy,
        positionYenemy,
        enemyWidth,
        enemyHeight,
        leftLimit,
        rightLimit,
        upLimit,
        downLimit,
        borderPosition,
        movePixelsenemy
	}) {
		this.nombre = nombre;
		this.framesEnemyLeft = framesEnemyLeft;
		this.framesEnemyRight = framesEnemyRight;
        this.framesEnemyUp = framesEnemyUp;
        this.framesEnemyDown = framesEnemyDown;
        this.animationIndexEnemy = animationIndexEnemy;
        this.positionXenemy = positionXenemy;
        this.positionYenemy = positionYenemy;
        this.enemyWidth = enemyWidth;
        this.enemyHeight = enemyHeight;
        this.leftLimit = leftLimit;
        this.rightLimit = rightLimit;
        this.upLimit = upLimit;
        this.downLimit = downLimit;
        this.borderPosition = borderPosition;
        this.movePixelsenemy = movePixelsenemy;
	}

	agregarFrameLeft(url) {
        const img = new Image();
        img.src = url;
		this.framesEnemyLeft.push(img);
	}
    agregarFrameRight(url) {
        const img = new Image();
        img.src = url;
		this.framesEnemyRight.push(img);
	}
    agregarFrameUp(url) {
        const img = new Image();
        img.src = url;
		this.framesEnemyUp.push(img);
	}
    agregarFrameDown(url) {
        const img = new Image();
        img.src = url;
		this.framesEnemyDown.push(img);
	}

    moveLeftEnemy() {
        if(collision || collision2 || level_1_completed) {
            return;
        }
        this.positionYenemy = this.positionYenemy;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
        if(sublevel == 0) {
            layout();
        } else if(sublevel == 1) {
            layout2();
        }
        shipPart(posXship, posYship);
        shipPartDisappear();
        levelWin();
        
        if(this.positionXenemy > this.leftLimit && this.borderPosition == 'right') {
            this.positionXenemy = this.positionXenemy - this.movePixelsenemy;
    
            this.animationIndexEnemy++
            if(this.animationIndexEnemy >= 5) {
                this.animationIndexEnemy = 0
            }
            ctx.drawImage(this.framesEnemyLeft[animationIndexEnemy], this.positionXenemy, this.positionYenemy, this.enemyWidth, this.enemyHeight);
    
            // Renderizo también al personaje (modificar si convierto al héroe en un  objeto)
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
    
            // Renderizo también al enemigo 2 (debo modificar esto cuando cree al otro enemigo)
            if(animationIndexEnemy2 >= 5) {
                animationIndexEnemy2 = 0
            }
            ctx.drawImage(framesEnemy2[animationIndexEnemy2], positionXenemy2, positionYenemy2, enemyWidth2, enemyHeight2);
    
            collisionCheck();
            collisionCheck2();
        } else {
            this.borderPosition = 'left';
            this.moveRightenemy();
        }
    }

    moveRightenemy() {
        if(collision || collision2 || level_1_completed) {
            return;
        }
        this.positionYenemy = this.positionYenemy;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
        if(sublevel == 0) {
            layout();
        } else if(sublevel == 1) {
            layout2();
        }
        shipPart(posXship, posYship);
        shipPartDisappear();
        levelWin();
        
        if(this.positionXenemy < this.rightLimit - this.enemyWidth && this.borderPosition == 'left') {
            this.positionXenemy = this.positionXenemy+this.movePixelsenemy;
    
            this.animationIndexEnemy++
            if(this.animationIndexEnemy >= 5) {
                this.animationIndexEnemy = 0
            }
            ctx.drawImage(this.framesEnemy[animationIndexEnemy], this.positionXenemy, this.positionYenemy, this.enemyWidth, this.enemyHeight);
    
            // Renderizo también al personaje (modificar si convierto al héroe en un  objeto)
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
    
            collisionCheck();
            collisionCheck2();
        } else {
            this.borderPosition = 'right';
            this.moveLeftEnemy();
        }
    
    }

    moveUpEnemy() {
        if(collision || collision2 || level_1_completed) {
            return;
        }
        this.positionXenemy = this.positionXenemy;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
        if(sublevel == 0) {
            layout();
        } else if(sublevel == 1) {
            layout2();
        }
        shipPart(posXship, posYship);
        shipPartDisappear();
        levelWin();
    
        if(this.positionYenemy > this.upLimit && this.borderPosition == 'down') {
            this.positionYenemy = this.positionYenemy-this.movePixelsenemy;
    
            this.animationIndexEnemy++
            if(this.animationIndexEnemy >= 5) {
                this.animationIndexEnemy = 0
            }
            ctx.drawImage(this.framesEnemy[this.animationIndexEnemy], this.positionXenemy, this.positionYenemy, this.enemyWidth, this.enemyHeight);
    
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
    
            collisionCheck();
            collisionCheck2();
        } else {
            this.borderPosition = 'up';
            this.moveDownEnemy();
        }
    }

    moveDownEnemy() {
        if(collision ||collision2 || level_1_completed) {
            return;
        }
        this.positionXenemy = this.positionXenemy;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
        if(sublevel == 0) {
            layout();
        } else if(sublevel == 1) {
            layout2();
        }
        shipPart(posXship, posYship);
        shipPartDisappear();
        levelWin();
    
        if(this.positionYenemy < this.downLimit - this.enemyHeight && this.borderPosition == 'up') {
            this.positionYenemy = this.positionYenemy+this.movePixelsenemy;
    
            this.animationIndexEnemy++
            if(this.animationIndexEnemy >= 5) {
                this.animationIndexEnemy = 0
            }
            ctx.drawImage(this.framesEnemy[this.animationIndexEnemy], this.positionXenemy, this.positionYenemy, this.enemyWidth, this.enemyHeight);
    
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
    
            collisionCheck();
            collisionCheck2();
        } else {
            this.borderPosition = 'down';
            this.moveUpEnemy();
        }
    }
}


// OBJETOS (INSTANCIAS) DEL PROTOTIPO "Enemies"
const enemy1 = new Enemies({
	nombre:"Alien 1",
	animationIndexEnemy: 0,
	positionXenemy: 200,
    positionYenemy: 518,
    enemyWidth: 35,
    enemyHeight: 53,
    leftLimit: 200,
    rightLimit:370,
    borderPosition: 'left',
    movePixelsenemy: 10
});

// Frames hacia la derecha
enemy1.agregarFrameRight('./assets/imgs/blue-alien/walk-right/blue__0006_walk_1.png');
enemy1.agregarFrameRight('./assets/imgs/blue-alien/walk-right/blue__0007_walk_2.png');
enemy1.agregarFrameRight('./assets/imgs/blue-alien/walk-right/blue__0008_walk_3.png');
enemy1.agregarFrameRight('./assets/imgs/blue-alien/walk-right/blue__0009_walk_4.png');
enemy1.agregarFrameRight('./assets/imgs/blue-alien/walk-right/blue__0010_walk_5.png');
enemy1.agregarFrameRight('./assets/imgs/blue-alien/walk-right/blue__0011_walk_6.png');

// Caminar hacia la izquierda
enemy1.agregarFrameLeft('./assets/imgs/blue-alien/walk-right/blue__0006_walk_1_izq.png');
enemy1.agregarFrameLeft('./assets/imgs/blue-alien/walk-right/blue__0007_walk_2_izq.png');
enemy1.agregarFrameLeft('./assets/imgs/blue-alien/walk-right/blue__0008_walk_3_izq.png');
enemy1.agregarFrameLeft('./assets/imgs/blue-alien/walk-right/blue__0009_walk_4_izq.png');
enemy1.agregarFrameLeft('./assets/imgs/blue-alien/walk-right/blue__0010_walk_5_izq.png');
enemy1.agregarFrameLeft('./assets/imgs/blue-alien/walk-right/blue__0011_walk_6_izq.png');


const enemy2 = new Enemies({
	nombre:"Alien 2",
	animationIndexEnemy: 0,
	positionXenemy: 310,
    positionYenemy: 0,
    enemyWidth: 35,
    enemyHeight: 53,
    upLimit: 0,
    downLimit: 277.8,
    borderPosition: 'up',
    movePixelsenemy: 13
});

// Frames hacia arriba
enemy2.agregarFrameUp('./assets/imgs/blue-alien/walk-right/blue__0006_walk_1.png');
enemy2.agregarFrameUp('./assets/imgs/blue-alien/walk-right/blue__0007_walk_2.png');
enemy2.agregarFrameUp('./assets/imgs/blue-alien/walk-right/blue__0008_walk_3.png');
enemy2.agregarFrameUp('./assets/imgs/blue-alien/walk-right/blue__0009_walk_4.png');
enemy2.agregarFrameUp('./assets/imgs/blue-alien/walk-right/blue__0010_walk_5.png');
enemy2.agregarFrameUp('./assets/imgs/blue-alien/walk-right/blue__0011_walk_6.png');

// Caminar hacia abajo
enemy2.agregarFrameDown('./assets/imgs/blue-alien/walk-right/blue__0006_walk_1_izq.png');
enemy2.agregarFrameDown('./assets/imgs/blue-alien/walk-right/blue__0007_walk_2_izq.png');
enemy2.agregarFrameDown('./assets/imgs/blue-alien/walk-right/blue__0008_walk_3_izq.png');
enemy2.agregarFrameDown('./assets/imgs/blue-alien/walk-right/blue__0009_walk_4_izq.png');
enemy2.agregarFrameDown('./assets/imgs/blue-alien/walk-right/blue__0010_walk_5_izq.png');
enemy2.agregarFrameDown('./assets/imgs/blue-alien/walk-right/blue__0011_walk_6_izq.png');

