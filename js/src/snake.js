import GameObject from './gameObject';

const UP = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;
const COLOR = 'white';

export default class Snake extends GameObject {
    constructor(game, x, y, length = 4) {
        super(game);
        this._x = x;
        this._y = y;
        this._growOnNextUpdate = false;
        this._currentDirection = RIGHT;
        this.buildInitialBody(length);
        this.bindKeyboardControls();
    }

    buildInitialBody(length) {
        this._bodyParts = []
        for(let i = 0; i < length; i++)
        {
            this._bodyParts.push({x: (this._x - i), y: this._y})
        }
    }

    getHeadPosition() {
        return this._bodyParts[0];
    }

    getBodyParts() {
        let bodyParts = Array.from(this._bodyParts);
        bodyParts.shift();
        return bodyParts;
    }

    getAllBodyParts() {
        return this._bodyParts;
    }

    goUp() {
        if (this._currentDirection != DOWN) this._currentDirection = UP;
    }

    goDown() {
        if (this._currentDirection != UP) this._currentDirection = DOWN;
    }

    goLeft() {
        if (this._currentDirection != RIGHT) this._currentDirection = LEFT;
    }

    goRight() {
        if (this._currentDirection != LEFT) this._currentDirection = RIGHT;
    }

    grow() {
        this._growOnNextUpdate = true;
    }

    update() {
        if (this._growOnNextUpdate == true) {
            this._growOnNextUpdate = false;
        } else {
            this._bodyParts.pop()
        }
        let newHead = {x: this._bodyParts[0].x, y: this._bodyParts[0].y};
        switch (this._currentDirection) {
            case UP:
                newHead.y -=1;
                break;
            case DOWN:
                newHead.y +=1;
                break;
            case RIGHT:
                newHead.x +=1;
                break;
            case LEFT:
                newHead.x-=1;
                break;
        }
        this._bodyParts.unshift(newHead);
    }

    draw() {
        this._bodyParts.forEach((part) => {
            this._game.drawSquare(part.x, part.y, COLOR)
        })
    }

    bindKeyboardControls() {
        this._game.input.onDownKey(this.goDown.bind(this));
        this._game.input.onUpKey(this.goUp.bind(this));
        this._game.input.onLeftKey(this.goLeft.bind(this));
        this._game.input.onRightKey(this.goRight.bind(this));
    }
}