let character;
let ghosts;

let playerSpriteL;
let playerSpriteR;
let ghostSprite;

const PLAYER_START_X = 50;
const PLAYER_START_Y = 450;

function preload() {
    playerSpriteL = loadImage('img/character-l.png');
    playerSpriteR = loadImage('img/character-r.png');
    ghostSprite = loadImage('img/ghost.png');
}

function setup() {
    createCanvas(800, 600);
    stroke(55,181,74);
    strokeWeight(4);

    this.character = new Character(PLAYER_START_X, PLAYER_START_Y);
    this.ghosts = [];

    this.ghosts.push(new Ghost(30, 30));
}

function draw() {
    background(100);
    tick();
    drawGround();
    drawSprites();
}

function drawGround() {
    push();
    fill(60);
    stroke(60);
    rect(
        0, PLAYER_START_Y + CHARACTER_HEIGHT,
        width, height - PLAYER_START_Y - CHARACTER_HEIGHT
    );
    pop();
}

function tick() {
    this.character.update();
    this.ghosts.forEach(ghost => {
        ghost.update();
    });
}

function drawSprites() {
    this.character.draw();
    this.ghosts.forEach(ghost => {
        ghost.draw();
    });
}
