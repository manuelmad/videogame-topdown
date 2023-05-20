const background = new Image();
background.src = '../assets/imgs/backgrounds/tilemap.png';

const backgroundTiles = {
  "0": {
    name: "fondo crema",
    x: 2,
    y: 69,
    width: 13,
    height: 13
  },
  "1": {
    name: "marcas de arena para fondo crema",
    x: 18,
    y: 69,
    width: 13,
    height: 13
  },
  "2": {
    name: "rocas grises para fondo crema",
    x: 101,
    y: 53,
    width: 13,
    height: 13
  },
  "3": {
    name: "camino de rocas vertical",
    x: 170,
    y: 68,
    width: 16,
    height: 16
  },
  "4": {
    name: "puerta cerrada",
    x: 153,
    y: 52,
    width: 16,
    height: 16
  },
  "5": {
    name: "pared de ladrillos grises",
    x: 69,
    y: 53,
    width: 13,
    height: 13
  },
  "6": {
    name: "fondo rojizo",
    x: 0,
    y: 0,
    width: 13,
    height: 13
  },
  "7": {
    name: "marcas de arena para fondo rojizo",
    x: 0,
    y: 16,
    width: 16,
    height: 16
  },
  "8": {
    name: "rocas grises para fondo rojizo",
    x: 0,
    y: 32,
    width: 16,
    height: 16
  },
}


const capsule = new Image();
capsule.src= '../assets/imgs/capsule/SNES-MegaManX-DrLight.png';

const capsuleSprites = {
  "0": {
    x: 0,
    y: 38,
    width: 55,
    height: 106
  }
};

const cannon = new Image();
cannon.src= '../assets/imgs/cannon/Cannon-left.png';

const cannonSprites = {
  "0": {
    x: 0,
    y: 0,
    width: 252,
    height: 139
  }
};

const button = new Image();
button.src= '../assets/imgs/button/arcade_button.png';

const buttonSprites = {
  "0": {
    x: 0,
    y: 0,
    width: 32,
    height: 32
  }
};

const walls3D = new Image();
walls3D.src = '../assets/imgs/backgrounds/walls_x.png';

const walls3Dtiles = {
  "0": {
    name: "extremo inferior vertical",
    x: 448,
    y: 0,
    width: 32,
    height: 32
  },
  "1": {
    name: "vertical sin extremos",
    x: 0,
    y: 0,
    width: 32,
    height: 32
  },
  "2": {
    name: "extremo superior vertical",
    x: 384,
    y: 0,
    width: 32,
    height: 32
  },
  "3": {
    name: "horizontal sin extremos",
    x: 32,
    y: 0,
    width: 32,
    height: 32
  },
  "4": {
    name: "extremo derecho horizontal",
    x: 414,
    y: 0,
    width: 32,
    height: 32
  },
  "5": {
    name: "extremo izquierdo horizontal",
    x: 352,
    y: 0,
    width: 32,
    height: 32
  }
};

const explosionSprite = new Image();
explosionSprite.src = '../assets/imgs/explosion/Explosion.png';

const explosionTiles = {
  "0": {
    x: 0,
    y: 0,
    width: 96,
    height: 96
  },
  "1": {
    x: 96,
    y: 0,
    width: 96,
    height: 96
  },
  "2": {
    x: 192,
    y: 0,
    width: 96,
    height: 96
  },
  "3": {
    x: 288,
    y: 0,
    width: 96,
    height: 96
  },
  "4": {
    x: 384,
    y: 0,
    width: 96,
    height: 96
  },
  "5": {
    x: 480,
    y: 0,
    width: 96,
    height: 96
  },
  "6": {
    x: 576,
    y: 0,
    width: 96,
    height: 96
  },
  "7": {
    x: 672,
    y: 0,
    width: 96,
    height: 96
  },
  "8": {
    x: 768,
    y: 0,
    width: 96,
    height: 96
  },
  "9": {
    x: 864,
    y: 0,
    width: 96,
    height: 96
  },
  "10": {
    x: 960,
    y: 0,
    width: 96,
    height: 96
  },
  "11": {
    x: 1056,
    y: 0,
    width: 96,
    height: 96
  }
};

const electricFenceSprite = new Image();
electricFenceSprite.src = '../assets/imgs/backgrounds/electric_fence_sprite_sheet.png';

const electricFenceTiles = {
  "0": {
    x: 0,
    y: 0,
    width: 96,
    height: 96
  },
  "1": {
    x: 96,
    y: 0,
    width: 96,
    height: 96
  },
  "2": {
    x: 192,
    y: 0,
    width: 96,
    height: 96
  },
  "3": {
    x: 288,
    y: 0,
    width: 96,
    height: 96
  },
  "4": {
    x: 384,
    y: 0,
    width: 96,
    height: 96
  },
  "5": {
    x: 480,
    y: 0,
    width: 96,
    height: 96
  },
  "6": {
    x: 576,
    y: 0,
    width: 96,
    height: 96
  },
  "7": {
    x: 672,
    y: 0,
    width: 96,
    height: 96
  },
  "8": {
    x: 768,
    y: 0,
    width: 96,
    height: 96
  },
  "9": {
    x: 864,
    y: 0,
    width: 96,
    height: 96
  },
  "10": {
    x: 960,
    y: 0,
    width: 96,
    height: 96
  },
  "11": {
    x: 1056,
    y: 0,
    width: 96,
    height: 96
  }
};