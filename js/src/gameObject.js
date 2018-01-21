export default class GameObject {
    constructor(game) {
        this._game = game;
    }
    getPosition() {
        return {x: null, y: null};
    }
    update() {}
    draw() {}
}