const CHARACTER_WIDTH = 42;
const CHARACTER_HEIGHT = 60;

const CHAR_MOVEMENT_SPEED = 5;

const FIRE_RATE = 5;
const FIRE_MAX_LENGTH = 350;

const FIRE_WIGGLE_OFFSET = 2;

class Character {
    x;
    y;
    direction = 1; // left = 0, right = 1
    firing = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(direction) {
        // left = 0, right = 1
        if (direction === 0) {
            if (this.firing === 0) {
                this.direction = 0
            }
            this.x -= CHAR_MOVEMENT_SPEED;
        } else {
            if (this.firing === 0) {
                this.direction = 1;
            }
            this.x += CHAR_MOVEMENT_SPEED;
        }
    }

    fire() {
        this.firing += FIRE_RATE;
        this.firing = constrain(this.firing, 0, FIRE_MAX_LENGTH);
    }

    update() {
        if (keyIsDown(LEFT_ARROW)) this.move(0);
        if (keyIsDown(RIGHT_ARROW)) this.move(1);
        if (keyIsDown(UP_ARROW)) {
            this.fire();
        } else {
            this.firing = 0;
        }
    }

    checkColliding(ghosts) {
        const colliding = [];
        let ghostsInFront;
        if (this.direction === 0) {
            ghostsInFront = ghosts.filter(ghost => ghost.x < this.x - CHARACTER_WIDTH);
        } else {
            ghostsInFront = ghosts.filter(ghost => ghost.x > this.x);
        }

        for (let p = 0; p < this.firing && ghostsInFront.length > 0; p += 10) {
            for (let g = ghostsInFront.length - 1; g >= 0; g--) {
                const ghost = ghostsInFront[g];
                if (this.ghostCollidesWithPoint(ghost, p)) {
                    colliding.push({
                        id: ghost.id,
                        point: p,
                    });
                    ghostsInFront.splice(g, 1);
                }
            }
        }

        return colliding;
    }

    ghostCollidesWithPoint(ghost, p) {
        let px, py;
        if (this.direction === 0) {
            px = this.x - p;
            py = this.y - p;
        } else {
            px = this.x + p + CHARACTER_WIDTH;
            py = this.y - p;
        }

        // rough debugging hitboxes
        // push();
        // fill(255, 0, 0);
        // rect(px-20, py-20, 20, 20);
        // rect(ghost.x, ghost.y, GHOST_WIDTH, GHOST_HEIGHT);
        // pop();

        return px > ghost.x
            && px < ghost.x + GHOST_WIDTH
            && py > ghost.y
            && py < ghost.y + GHOST_HEIGHT;
    }

    draw() {
        this.x = constrain(this.x, 0, width - CHARACTER_WIDTH);
        this.y = constrain(this.y, 0, height - CHARACTER_HEIGHT);
        // image(playerSprite, this.x, this.y, CHARACTER_WIDTH, CHARACTER_HEIGHT);
        image(
            this.direction === 0 ? playerSpriteL : playerSpriteR,
            this.x, this.y, CHARACTER_WIDTH, CHARACTER_HEIGHT
        );
        if (this.firing !== 0) {
            this.drawStream();
        }
    }

    drawStream() {
        for (let p = 0; p < this.firing; p++) {
            let px, py;
            if (this.direction === 0) {
                px = this.x - p;
                py = this.y - p;
            } else {
                px = this.x + p + CHARACTER_WIDTH;
                py = this.y - p;
            }
            const [xOff, yOff] = this.calcOffset();
            px += xOff * FIRE_WIGGLE_OFFSET;
            py += yOff * FIRE_WIGGLE_OFFSET;
            point(px, py);
        }
    }

    calcOffset() {
        const offset = int(random(0, 9));
        switch (offset) {
            case 0: return [-1, -1]
            case 1: return [0, -1]
            case 2: return [1, -1]
            case 3: return [-1, 0]
            case 4: return [0, 0]
            case 5: return [1, 0]
            case 6: return [-1, 1]
            case 7: return [0, 1]
            case 8: return [1, 1]
        }
    }
}
