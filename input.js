const deadZone = 0.02;

export function initializeInput() {
    let gamepad = undefined;
    const arrowKeys = {
       up: false,
       down: false,
       left: false,
       right: false,
    };

    window.addEventListener('gamepadconnected', (e) => {
        if (!gamepad) {
            gamepad = e.gamepad;
        }
    });

    document.onkeydown = (e) => {
        switch (e.key) {
            case 'ArrowUp':
                arrowKeys.up = true;
                break;
            case 'ArrowDown':
                arrowKeys.down = true;
                break;
            case 'ArrowLeft':
                arrowKeys.left = true;
                break;
            case 'ArrowRight':
                arrowKeys.right = true;
                break;
        }
    };

    document.onkeyup = (e) => {
        switch (e.key) {
            case 'ArrowUp':
                arrowKeys.up = false;
                break;
            case 'ArrowDown':
                arrowKeys.down = false;
                break;
            case 'ArrowLeft':
                arrowKeys.left = false;
                break;
            case 'ArrowRight':
                arrowKeys.right = false;
                break;
        }
    };

    return {
        applyFrame() {
            let xInputRatio = 0;
            let zInputRatio = 0;

            const gamepads = navigator.getGamepads();
            if (gamepads && gamepads.length > 0 && gamepads[0]) {
                xInputRatio = gamepads[0].axes[0];
                zInputRatio = gamepads[0].axes[1];
            }

            if (arrowKeys.down === true) {
                zInputRatio = 1;
            } else if (arrowKeys.up === true) {
                zInputRatio = -1;
            }

            if (arrowKeys.right === true) {
                xInputRatio = 1;
            } else if (arrowKeys.left === true) {
                xInputRatio = -1;
            }

            return {
                mageVelocity: {
                    x: Math.abs(xInputRatio) > deadZone ? xInputRatio * 15.0 : 0.0,
                    y: 0.0,
                    z: Math.abs(zInputRatio) > deadZone ? zInputRatio * 15.0 : 0.0,
                },
            };
        },
    };
}
