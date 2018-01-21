export default class ArrowInput {
    constructor() {
        this._fnDown = null;
        this._fnLeft = null;
        this._fnRight = null;
        this._fnUp = null;

        window.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 37: // Left
                    this.fnLeft();
                    break;

                case 38: // Up
                    this.fnUp();
                    break;

                case 39: // Right
                    this.fnRight();
                    break;

                case 40: // Down
                    this.fnDown();
                    break;
            }
        }, false);
    }

    onDownKey(fn) {
        this._fnDown = fn;
    }

    onUpKey(fn) {
        this._fnUp = fn;
    }

    onLeftKey(fn) {
        this._fnLeft = fn;
    }

    onRightKey(fn) {
        this._fnRight = fn;
    }

    fnDown() {
        if (this._fnDown != null) this._fnDown.call();
    }

    fnRight() {
        if (this._fnRight != null) this._fnRight.call();
    }

    fnUp() {
        if (this._fnUp != null) this._fnUp.call();
    }

    fnLeft() {
        if (this._fnLeft != null) this._fnLeft.call();
    }
}