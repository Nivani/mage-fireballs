export function initializeInput() {
    let gamepad = undefined;

    window.addEventListener("gamepadconnected", (e) => {
        if (!gamepad) {
            gamepad = e.gamepad;
        }
    });

    return {
        applyInput(actors, camera) {
            const gamepads = navigator.getGamepads();
            if (gamepads && gamepads.length > 0 && gamepads[0]) {
                const xChange = gamepads[0].axes[0] / 2;
                actors.mage.position.x += xChange;
                camera.position.x += xChange;
                const zChange = gamepads[0].axes[1] / 2;
                actors.mage.position.z += zChange;
                camera.position.z += zChange;
            }
        },
    };
}