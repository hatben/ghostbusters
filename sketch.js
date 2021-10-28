let character;

let playerSpriteL;
let playerSpriteR;

const PLAYER_START_X = 50;
const PLAYER_START_Y = 450;

function preload() {
    playerSpriteL = loadImage('img/character-l.png');
    playerSpriteR = loadImage('img/character-r.png');
}

function setup() {
    createCanvas(800, 600);
    stroke(55,181,74);
    strokeWeight(4);

    this.character = new Character(PLAYER_START_X, PLAYER_START_Y);
}

function draw() {
    background(100);
    drawGround();
    tick();
    drawSprites();
}

function drawGround() {
    push();
    fill(60);
    stroke(60);
    rect(
        0, PLAYER_START_Y + CHARACTER_HEIGHT,
        displayWidth, displayHeight - PLAYER_START_Y - CHARACTER_HEIGHT
    );
    pop();
}

function tick() {
    this.character.update();
}

function drawSprites() {
    this.character.draw();
}
