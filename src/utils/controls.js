
class Controls {
    gamepadConnected = false;
    gamepadTrackInterval;

    keyboardKeyodes = {
        LEFT: 37,
        RIGHT: 39,
        SPACE: 32,
        RESTART: 82,
        SPEED: 83
    };

    gamepadKeys = {
        A: 'A',
        B: 'B',
        X: 'X',
        Y: 'Y',
        L1: 'L1',
        R1: 'R1',
        L2: 'L2',
        R2: 'R2',
        SELECT: 'SELECT',
        START: 'START',
        LS: 'LS',
        RS: 'RS',
        UP: 'UP',
        DOWN: 'DOWN',
        LEFT: 'LEFT',
        RIGHT: 'RIGHT'
    };

    gamepadEvents = {
        GAMEPAD_CONNECTED: 'gamepadconnected',
        GAMEPAD_DISCONNECTED: 'gamepaddisconnected'
    };

    gameEvents = {
        MOVE_RACKET_LEFT: 'moveRacketLeft',
        MOVE_RACKET_RIGHT: 'moveRacketRight',
        TOGGLE_PAUSE: 'togglePause',
        RESTART_GAME: 'restartGame'
    };

    init () {
        this.initGamepad();
        this.initKeyboard();
    }

    initGamepad () {
        if ('getGamepads' in navigator) {
            window.addEventListener('gamepadconnected', () => {
                this.gamepadConnected = true;
                this.gamepadTrackInterval = window.setInterval(this.trackGamepadButtonPress, 150);
            });

            window.addEventListener('gamepaddisconnected', () => {
                clearInterval(this.gamepadTrackInterval);
            });

            var checkGamepadConnected = window.setInterval(() => {
                if (navigator.getGamepads()[0]) {
                    if(!this.gamepadConnected) {
                        const event = new CustomEvent(this.gamepadEvents.GAMEPAD_CONNECTED);
                        window.dispatchEvent(event);
                    }
                    window.clearInterval(checkGamepadConnected);
                }
            }, 500);
        }
    }

    initKeyboard () {
        window.onkeydown = ({ keyCode }) => {
            const eventToDispatch = this.getGameEventByKeyboardButton(keyCode);

            if (eventToDispatch) {
                dispatchEvent(new CustomEvent(eventToDispatch));
            }
        };
    }

    getGamepadButtonByIndex (index) {
        return Object.values(this.gamepadKeys)[index];
    }

    getGameEventByGamepadButton (gamepadButton) {
        const { LEFT, RIGHT, START } = this.gamepadKeys;
        switch (gamepadButton) {
            case LEFT: return this.gameEvents.MOVE_RACKET_LEFT;
            case RIGHT: return this.gameEvents.MOVE_RACKET_RIGHT;
            case START: return this.gameEvents.TOGGLE_PAUSE;
            default: return null;
        }
    }

    getGameEventByKeyboardButton (keyboardButton) {
        const { LEFT, RIGHT, SPACE, RESTART } = this.keyboardKeyodes;

        switch (keyboardButton) {
            case LEFT: return this.gameEvents.MOVE_RACKET_LEFT;
            case RIGHT: return this.gameEvents.MOVE_RACKET_RIGHT;
            case SPACE: return this.gameEvents.TOGGLE_PAUSE;
            case RESTART: return this.gameEvents.RESTART_GAME;
            default: return null;
        }
    }

    trackGamepadButtonPress = () => {
        const gp = navigator.getGamepads()[0];

        gp.buttons.forEach((button, index) => {
            if (button.pressed) {
                const pressedButton = this.getGamepadButtonByIndex(index);
                const eventToDispatch = this.getGameEventByGamepadButton(pressedButton);

                if (eventToDispatch && pressedButton !== this.gamepadKeys.START) {
                    dispatchEvent(new CustomEvent(eventToDispatch));
                }
            }
            if (button.touched) {
                const touchedButton = this.getGamepadButtonByIndex(index);
                if (touchedButton === this.gamepadKeys.START) {
                    dispatchEvent(new CustomEvent(this.gameEvents.TOGGLE_PAUSE));
                }
            }
        });
    }
}

export default new Controls();
