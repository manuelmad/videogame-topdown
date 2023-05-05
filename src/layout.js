/* configuración del canvas */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// Dimensiones del heroe sobre el canvas
let characterWidth;
let characterHeight;

// Tamaño de canvas responsivo
let tamano_ventana = window.innerWidth;
console.log(tamano_ventana, window.innerHeight);
if(tamano_ventana < 600) {
	canvas.setAttribute("width", 300);
	canvas.setAttribute("height", 300);
	characterWidth = 30;
	characterHeight = 45;
}
else if(tamano_ventana >= 600 && tamano_ventana < 1024) {
	canvas.setAttribute("width", 500);
	canvas.setAttribute("height", 500);
	characterWidth = 50;
	characterHeight = 75;
}
else if(tamano_ventana >= 1024) {
	canvas.setAttribute("width", 700);
	canvas.setAttribute("height", 700);
	characterWidth = 70;
	characterHeight = 105;
}

// Dimensiones del canvas en variables
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let elementsSize = canvasWidth/10;

let level = 0;

const map = maps[level];

const mapRows = map.trim().split('\n');

const mapRowsCols = mapRows.map(row => row.trim().split(''));

const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemiesPositions = [];


const layout = () => {
    mapRowsCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX = elementsSize * (colI + 1);
        const posY = elementsSize * (rowI + 1);
        ctx.fillText(emoji, posX, posY);
        
        if(col == 'O') {
            if(!playerPosition.x && !playerPosition.y) {
               playerPosition.x = posX;
               playerPosition.y = posY;
            }
        }
        else if (col == 'I') {
            giftPosition.x = posX;
            giftPosition.y = posY;
        }
        else if (col == 'X') {
        enemiesPositions.push({
            x: posX,
            y: posY,
            });
        }
    });
});
}