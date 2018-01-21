import GameObject from "./gameObject";

const COLOR = 'gray';

export default class Wall extends GameObject {
    constructor(game, x, y) {
        super(game);
        this._x = x;
        this._y = y;
    }
    getPosition() {
        return {x: this._x, y: this._y};
    }
    draw() {
        this._game.drawSquare(this._x, this._y, COLOR)
    }
}