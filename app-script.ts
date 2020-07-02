/*tslint:disable*/

// Tank Game by Sam Shi and Noah MacFarlane

// Approved by Raine & Spencer

import {
    Sprite,
    Application,
    Rectangle,
    Graphics,
    DisplayObject,
} from "pixi.js";

let appWidth = 920;
let appHeight = 683;
let appMiddle = appHeight / 2 + 100;

const app: Application = new Application({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);

let background: Sprite = Sprite.from("./lemon.png");
app.stage.addChild(background);

var wall = Sprite.from("./WALL.png");
wall.y = 650;

let ground = new Graphics();
ground.lineStyle(5, 0x567D4, 1);
ground.moveTo(0, (appMiddle + 64));
ground.lineTo(appWidth, (appMiddle + 64));

let sin = new Graphics();
sin.lineStyle(5, 0x0000000, 1);
sin.beginFill(0x567D46);

sin.moveTo(0, appMiddle);
sin.lineTo(appWidth, appMiddle);
sin.lineTo(appWidth, appHeight).lineTo(0, appHeight).lineTo(0, appMiddle);
sin.endFill();

app.stage.addChild(sin);

wall.x = (appWidth / 2) - 50 * 0.75;
wall.y = (appHeight) - 335 * 0.75;
wall.scale.x = 0.75;
wall.scale.y = 0.75;
app.stage.addChild(wall);

class Tank {
    player: number;

    sprite: Sprite;

    barrelPosition: number;

    constructor(player: number, pos: number, x?: number, y?: number) {
        this.player = player;

        switch (pos) {
            case 1:
                this.sprite = Sprite.from("./tank1.png");
                this.barrelPosition = 1;
                break;
            case 2:
                this.sprite = Sprite.from("./tank2.png");
                this.barrelPosition = 2;
                break;
            case 3:
                this.sprite = Sprite.from("./tank3.png");
                this.barrelPosition = 3;
                break;
            default:
                break;
        }
        this.sprite.scale.y = 0.3;
        app.stage.addChild(this.sprite);

        if (player === 1) {
            this.sprite.scale.x = 0.3;
            if (x === undefined) {
                this.sprite.x = 40;
                this.sprite.y = appMiddle - (1050 * 0.05);
            } else {
                this.sprite.x = x;
                this.sprite.y = y;
            }

        } else {
            if (x === undefined) {
                this.sprite.x = appWidth - 40;
                this.sprite.y = appMiddle - (1050 * 0.05);
            } else {
                this.sprite.x = x;
                this.sprite.y = y;
            }
            this.sprite.scale.x = -0.3;
        }
    }
}

class Projectile {
    sprite: Sprite = Sprite.from("./PROJECTILE.png");

    tankX: number;

    tankNumber: number;

    initialize = (player: Tank): void => {

        this.sprite.scale.x = 0.2;

        this.sprite.scale.y = 0.2;

        if (player.player === 1) {

            switch (player.barrelPosition) {
                case 1:
                    this.sprite.x = player.sprite.x + 100;
                    this.sprite.y = player.sprite.y + 60;
                    break;
                case 2:
                    this.sprite.x = player.sprite.x + 95;
                    this.sprite.y = player.sprite.y + 50;
                    break;
                case 3:
                    this.sprite.x = player.sprite.x + 92;
                    this.sprite.y = player.sprite.y + 40;
                    break;
                default:
                    break;
            }
        } else {
            this.sprite.scale.x *= -1;

            switch (player.barrelPosition) {
                case 1:
                    this.sprite.x = player.sprite.x - 100;
                    this.sprite.y = player.sprite.y + 60;
                    break;
                case 2:
                    this.sprite.x = player.sprite.x - 95;
                    this.sprite.y = player.sprite.y + 50;
                    break;
                case 3:
                    this.sprite.x = player.sprite.x - 92;
                    this.sprite.y = player.sprite.y + 40;
                    break;
                default:
                    break;
            }
        }

    
        this.tankNumber = player.player;

        app.stage.addChild(this.sprite);

        this.tankX = player.sprite.x;
    }
}

let player1 = new Tank(1, 1);
let player2 = new Tank(2, 1);

let isColliding = (a: DisplayObject, b: DisplayObject): boolean => {
    let ab: Rectangle = a.getBounds();
    let bb: Rectangle = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
};


let L1: number = 0;
let R1: number = 0;
let D1: number = 0;
let U1: number = 0;

let L2: number = 0;
let R2: number = 0;
let D2: number = 0;
let U2: number = 0;

let SHOOTPLAYERONE: boolean = false;
let SHOOTPLAYERTWO: boolean = false;

const LEFT: number = 37;
const UP: number = 38;
const RIGHT: number = 39;
const DOWN: number = 40;

const WASD: number = 87;
const ASDW: number = 65;
const SDWA: number = 83;
const DWAS: number = 68;

const SPACE: number = 32;
const SHIFT: number = 16;

window.addEventListener('keydown', (e: KeyboardEvent): void => {
    if (e.keyCode === UP) {

        if (player2.barrelPosition < 3) {
            let x = player2.sprite.x;
            let y = player2.sprite.y;

            app.stage.removeChild(player2.sprite);

            player2 = new Tank(2, player2.barrelPosition + 1, x, y);
        }
    } else if (e.keyCode === DOWN) {
        if (player2.barrelPosition > 1) {
            let x = player2.sprite.x;
            let y = player2.sprite.y;

            app.stage.removeChild(player2.sprite);

            player2 = new Tank(2, player2.barrelPosition - 1, x, y);
        }
    } else if (e.keyCode === RIGHT) {
        if (isColliding(sin, player2.sprite)) {
            R2 = 1;
        }
    } else if (e.keyCode === LEFT) {
        if (isColliding(sin, player2.sprite)) {
            L2 = -1;
        }
    }

    if (e.keyCode === WASD) {
        if (player1.barrelPosition < 3) {
            let x = player1.sprite.x;
            let y = player1.sprite.y;

            app.stage.removeChild(player1.sprite);

            player1 = new Tank(1, player1.barrelPosition + 1, x, y);
        }
    } else if (e.keyCode === SDWA) {
        if (player1.barrelPosition > 1) {
            let x = player1.sprite.x;
            let y = player1.sprite.y;

            app.stage.removeChild(player1.sprite);

            player1 = new Tank(1, player1.barrelPosition - 1, x, y);
        }
    } else if (e.keyCode === DWAS) {
        R1 = 1;
    } else if (e.keyCode === ASDW) {
        L1 = -1;
    }

    if (e.keyCode === SPACE) {
        SHOOTPLAYERONE = true;
        makeProjPlayerOne = true;
        oneProjectileAllowerPlayerOne = true;
    }

    if (e.keyCode === SHIFT) {
        SHOOTPLAYERTWO = true;
        makeProjPlayerTwo = true;
        oneProjectileAllowerPlayerTwo = true;
    }
}, false);

window.addEventListener('keyup', (e: KeyboardEvent): void => {
    if (e.keyCode === UP) {
        U2 = 0;
    } else if (e.keyCode === DOWN) {
        D2 = 0;
    } else if (e.keyCode === RIGHT) {
        R2 = 0;
    } else if (e.keyCode === LEFT) {
        L2 = 0;
    }

    if (e.keyCode === WASD) {
        U1 = 0;
    } else if (e.keyCode === SDWA) {
        D1 = 0;
    } else if (e.keyCode === DWAS) {
        R1 = 0;
    } else if (e.keyCode === ASDW) {
        L1 = 0;
    }

    if (e.keyCode === SPACE) {
        SHOOTPLAYERONE = false;
    }

    if (e.keyCode === SHIFT) {
        SHOOTPLAYERTWO = false;
    }
}, false);

let pY: number = 0;
let pX: number = 0;

let projectile1 = (x: number): void => {
    pX = 4;
    pY = 0.25;
};

let sumProj: number;

let makeProjPlayerOne: boolean = false;
let makeProjPlayerTwo: boolean = false;

let projectiles: Projectile[] = [];

let oneProjectileAllowerPlayerOne: boolean = false;
let oneProjectileAllowerPlayerTwo: boolean = false;

app.ticker.add((delta: number): void => {

    if (!isColliding(player2.sprite, wall)) {
        player2.sprite.x += (L2 + R2);
    }

    if (!isColliding(player1.sprite, wall)) {
        player1.sprite.x += (L1 + R1);
    }

    if (player1.sprite.x <= 0) {
        player1.sprite.x++;
    }

    if (isColliding(player2.sprite, wall)) {
        player2.sprite.x++;
    }
    if (isColliding(player1.sprite, wall)) {
        player1.sprite.x--;
    }

    let sumProj: number = 0;
    sumProj += delta;

    if (SHOOTPLAYERONE) {
        let proj: Projectile;
        if (makeProjPlayerOne && oneProjectileAllowerPlayerOne) {
            proj = new Projectile();
            proj.initialize(player1);
            projectiles[projectiles.length] = proj;
            oneProjectileAllowerPlayerOne = false;
        }
    }

    if (SHOOTPLAYERTWO) {
        let proj: Projectile;
        if (makeProjPlayerTwo && oneProjectileAllowerPlayerTwo) {
            proj = new Projectile();
            proj.initialize(player2);
            projectiles[projectiles.length] = proj;
            oneProjectileAllowerPlayerTwo = false;
        }
    }

    for (let i = 0; i < projectiles.length; i++) {
        
                if (!isColliding(projectiles[i].sprite, ground)) {
                projectile1(projectiles[i].sprite.x - projectiles[i].tankX);
                if (projectiles[i].tankNumber === 2) {
                    projectiles[i].sprite.x -= pX;
                } else {
                    projectiles[i].sprite.x += pX;
                }

                if (sumProj % 1000) {
                    projectiles[i].sprite.y += pY;
                }
                pX = 0;
                pY = 0;
            } else {
                let tempX = projectiles[i].sprite.x;
                let tempY = projectiles[i].sprite.y;
                app.stage.removeChild(projectiles[i].sprite);
                var explosion: Sprite = Sprite.from("./EXPLOSION1.png");
                explosion.x = tempX - 30;
                explosion.y = tempY - 30;
                explosion.scale.x = 0.2;
                explosion.scale.y = 0.2;
                app.stage.addChild(explosion);
                explosion.y--;
                if (explosion.y < 0) {
                    app.stage.removeChild(explosion);
                }
            }

        if ((isColliding(player1.sprite, projectiles[i].sprite) && projectiles[i].tankNumber === 2) || (isColliding(player2.sprite, projectiles[i].sprite) && projectiles[i].tankNumber === 1)) {
            let gameOver = Sprite.from("./gameover.png");
            app.stage.addChild(gameOver);
        }
    }

    sumProj = 0;
});