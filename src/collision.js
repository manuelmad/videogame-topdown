let collision = false;

if((positionXenemy < positionX+characterWidth) && (positionYenemy+enemyWidth)>positionX) {
    collision = true;
    console.log('Hay colisión!!!');
}