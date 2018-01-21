import GameObject from './gameObject';
import getRandomInt from "./random-int";

const COLOR = 'green';

export default class Food extends GameObject {
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

    newLocation() {
        let x = getRandomInt(0,40);
        let y = getRandomInt(0,40);
console.log('new location tried');
        if (! this._game.getWalls().some(wall => wall.getPosition().x == x && wall.getPosition().y == y) &&
            ! this._game.getSnake().getAllBodyParts().some(bodyPart => bodyPart.x == x && bodyPart.y == y)) {
            this._x = x;
            this._y = y;
            console.log('new location found');
        } else {
            console.log('new location failed');
            this.newLocation();
        }
    }
}