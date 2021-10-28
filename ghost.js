const GHOST_WIDTH = 54;
const GHOST_HEIGHT = 50;

const GHOST_MOVEMENT_SPEED = 2;

const MAX_VERTICAL = 200;

class Ghost {
    x;
    y;
    bias;
    verticalDirection;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bias = this.x < width / 2 ? 'right' : 'left';
        this.verticalDirection = 'down';
    }

    update() {
        const biasDirection = this.bias === 'right' ? GHOST_MOVEMENT_SPEED : -GHOST_MOVEMENT_SPEED;
        const r = int(random(0, 4));
        switch (r) {
            case 0:
            case 1:
                // vertical movement
                this.y += this.verticalDirection === 'down' ? GHOST_MOVEMENT_SPEED : -GHOST_MOVEMENT_SPEED;
                break;
            case 2:
            case 3:
                // bias movement direction
                this.x += biasDirection;
                break;
            case 4:
                // opposite bias direction
                this.x -= biasDirection;
                break;
        }

        if (this.x > width - GHOST_WIDTH - 20) {
            this.bias = 'left';
        } else if (this.x < 20) {
            this.bias = 'right';
        }

        if (this.y > MAX_VERTICAL) {
            this.verticalDirection = 'up';
        } else if (this.y < 20) {
            this.verticalDirection = 'down';
        }

    }

    draw() {
        this.x = constrain(this.x, 0, width - GHOST_WIDTH);
        this.y = constrain(this.y, 0, height - GHOST_HEIGHT);
        image(ghostSprite, this.x, this.y, CHARACTER_WIDTH, CHARACTER_HEIGHT);
    }
}
