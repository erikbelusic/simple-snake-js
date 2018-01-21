import ArrowInput from "./input";
import Wall from "./wall";
import Snake from "./snake";
import Food from "./food";

const HEIGHT = 400;
const WIDTH = 400;
const UNIT_SIZE = 10;

export default class Game {
    constructor(canvasElementId, scoreElementId) {
        this.input = new ArrowInput();
        this._running = false;
        this.initCanvas(canvasElementId);
        this.initScore(scoreElementId);
        this.initGameObjects();
    }

    initGameObjects() {
        this._gameObjects = [];
        for (let i = 0; i < 40; i++) {
            this.addGameObject(new Wall(this, i, 0)) // top
            this.addGameObject(new Wall(this, 0, i)) // left
            this.addGameObject(new Wall(this, i, 39)) // bottom
            this.addGameObject(new Wall(this, 39, i)) // right
        }
        this.addGameObject(new Food(this, 10, 10));
        this.addGameObject(new Snake(this, 20, 20));
    }

    getWalls() {
        return this._gameObjects.filter(obj => obj.constructor.name == 'Wall');
    }

    getSnake() {
        return this._gameObjects.filter(obj => obj.constructor.name == 'Snake')[0];
    }

    getFood() {
        return this._gameObjects.filter(obj => obj.constructor.name == 'Food')[0];
    }

    initCanvas(canvasElementId) {
        this._canvas = document.getElementById(canvasElementId);
        this._canvas.height = HEIGHT;
        this._canvas.width = WIDTH;
        this._ctx = this._canvas.getContext('2d');
        this.drawBackground();
    }

    drawBackground() {
        this._ctx.fillStyle = 'rgb(0,0,0)';
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    initScore(scoreElementId) {
        this.scoreEl = document.getElementById(scoreElementId);
        this.resetScore();
    }

    incrementScore() {
        this.score += 1;
        this.scoreEl.textContent = this.score;
    }

    resetScore() {
        this.score = 0;
        this.scoreEl.textContent = this.score;
    }

    drawSquare(x, y, color) {
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x * UNIT_SIZE, y * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE);
    }

    update() {
        this._gameObjects.forEach((gameObject) => {
            gameObject.update();
        })
    }

    draw() {
        this.drawBackground();
        this._gameObjects.forEach((gameObject) => {
            gameObject.draw();
        })
        if(this.checkForCollisionsWithFood()) {
            this.incrementScore();
            this.getSnake().grow();
            this.getFood().newLocation();
        }
        if(this.checkForCollisionsWithWalls()) {
            this.gameOver();
        }
        if(this.checkForCollisionsWithTail()) {
            this.gameOver();
        }
    }

    gameOver() {
        alert('GAME OVER!');
    }

    start() {
        this.loop();
    }

    loop() {
        this._running = setTimeout(() => {
            this.update()
            this.draw()
            this.loop()
        }, 125)
    }

    addGameObject(object) {
        this._gameObjects.push(object);
    }

    checkForCollisionsWithWalls() {
        return this.getWalls().some(wall => {
            return wall.getPosition().x == this.getSnake().getHeadPosition().x && wall.getPosition().y == this.getSnake().getHeadPosition().y;
        })
    }

    checkForCollisionsWithTail() {
        return this.getSnake().getBodyParts().some(bodyPart => {
            return bodyPart.x == this.getSnake().getHeadPosition().x && bodyPart.y == this.getSnake().getHeadPosition().y;
        })
    }

    checkForCollisionsWithFood() {
        return this.getFood().getPosition().x == this.getSnake().getHeadPosition().x && this.getFood().getPosition().y == this.getSnake().getHeadPosition().y;
    }
}